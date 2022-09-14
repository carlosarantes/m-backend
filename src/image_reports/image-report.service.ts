import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  ImageReport,
  ImageReportDocument,
} from '../users/schemas/image_report.schema';
import { analyzeImage } from '../helpers/image-analyzer';
import { UsersService } from '../users/users.service';
import { EvaluationDetailsDto } from './dto/evaluation-details.dto';

@Injectable()
export class ImageReportService {
  constructor(
    @InjectModel(ImageReport.name)
    private imageReportModel: Model<ImageReportDocument>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}

  async findAll(): Promise<ImageReport[]> {
    return await this.imageReportModel
      .find()
      .populate(['user', 'user_evaluation'])
      .exec();
  }

  async findById(id: string): Promise<ImageReport> {
    try {
      return await this.imageReportModel
        .findById(id)
        .populate(['user', 'user_evaluation'])
        .exec();
    } catch (error) {
      throw new NotFoundException('This report was not found');
    }
  }

  async delete(id: string): Promise<unknown> {
    try {
      const user = await this.imageReportModel.findByIdAndDelete(id).exec();
      if (!user) throw new ConflictException('This report does not exists.');
      return;
    } catch (error) {
      throw new NotFoundException('This report was not found');
    }
  }

  async approvation(
    id: string,
    userEvaluationId: string,
    approved: boolean,
    evaluationDetails: EvaluationDetailsDto,
  ): Promise<unknown> {
    const imageReport = await this.findById(id);
    const userEvaluation = await this.userService.findById(userEvaluationId);

    imageReport.approved = approved;
    imageReport.evaluation_method = 'MANUAL';
    imageReport.user_evaluation = userEvaluation.id;
    imageReport.evaluations = null;
    imageReport.evaluationDetails = evaluationDetails as any;
    imageReport.requiresManualEvaluation = false;

    if (approved) {
      const userImageOwner = await this.userService.findById(
        imageReport.user._id,
      );

      userImageOwner.current_avatar = imageReport.image;
      await userImageOwner.save();
    }

    await imageReport.save();
    return imageReport;
  }

  async analyzeImage(
    file: Express.Multer.File,
    userImageOwnerId: string,
  ): Promise<unknown> {
    const evaluationResult = await analyzeImage(file.path);

    const userImageOwner = await this.userService.findById(userImageOwnerId);

    const createdReport = new this.imageReportModel({
      ...evaluationResult,
      user: userImageOwner.id,
      image: file.path,
      evaluation_method: 'AUTOMATIC',
    });

    await createdReport.save();

    if (evaluationResult.approved) {
      userImageOwner.current_avatar = file.path;
      userImageOwner.avatar_approved = true;
    } else {
      userImageOwner.avatar_approved = false;
    }

    await userImageOwner.save();

    return evaluationResult;
  }
}
