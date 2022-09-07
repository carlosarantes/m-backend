import * as vision from '@google-cloud/vision';
import { ContentLikelihood, ContentType, LikeliHoodRedflag } from '../enums';

const client = new vision.ImageAnnotatorClient();

type TReturn = {
  approved: boolean;
  gotError?: boolean;
  requiresManualEvaluation: boolean;
  evaluations?: {
    [ContentType.ADULT]: number;
    [ContentType.SPOOF]: number;
    [ContentType.VIOLENCE]: number;
    [ContentType.RACY]: number;
  };
  evaluationDetails: {
    [ContentType.ADULT]: string;
    [ContentType.SPOOF]: string;
    [ContentType.VIOLENCE]: string;
    [ContentType.RACY]: string;
  };
};

const analyzeImage = async (filePath: string): Promise<TReturn> => {
  try {
    const [result] = await client.safeSearchDetection(filePath);

    const detections = result.safeSearchAnnotation;
    const evaluations = {
      [ContentType.ADULT]: parseInt(
        ContentLikelihood[detections.adult].toString(),
      ),
      [ContentType.SPOOF]: parseInt(
        ContentLikelihood[detections.spoof].toString(),
      ),
      [ContentType.VIOLENCE]: parseInt(
        ContentLikelihood[detections.violence].toString(),
      ),
      [ContentType.RACY]: parseInt(
        ContentLikelihood[detections.racy].toString(),
      ),
    };

    let approved = true;
    let requiresManualEvaluation = false;
    const evaluationDetails = {
      [ContentType.ADULT]: '',
      [ContentType.SPOOF]: '',
      [ContentType.VIOLENCE]: '',
      [ContentType.RACY]: '',
    };

    Object.entries(evaluations).forEach((entry) => {
      const type = entry[0];
      const evaluation = parseInt(entry[1].toString());

      if (evaluation >= LikeliHoodRedflag[type]) {
        approved = false;
      }

      if (evaluation > LikeliHoodRedflag[type]) {
        requiresManualEvaluation = false;
      }

      if (evaluation == LikeliHoodRedflag[type]) {
        requiresManualEvaluation = true;
      }

      evaluationDetails[type] =
        (evaluation * 100) / ContentLikelihood.VERY_LIKELY +
        `% of posibility of ${type} content.`;
    });

    return {
      approved,
      requiresManualEvaluation,
      evaluations,
      evaluationDetails,
    };
  } catch (error) {
    return {
      approved: false,
      gotError: true,
      requiresManualEvaluation: true,
      evaluationDetails: {
        ADULT: 'Could not evaluate racist content due an error in library.',
        RACY: 'Could not evaluate racist content due an error in library.',
        SPOOF: 'Could not evaluate racist content due an error in library.',
        VIOLENCE: 'Could not evaluate racist content due an error in library.',
      },
    };
  }
};

export { analyzeImage };
