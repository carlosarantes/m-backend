export enum UserRole {
  ADMIN = 'ADMIN',
  COMMON = 'COMMON',
}

export enum EvaluationMethod {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
}

export enum ContentLikelihood {
  UNKNOWN = 0,
  VERY_UNLIKELY = 1,
  UNLIKELY = 2,
  POSSIBLE = 3,
  LIKELY = 4,
  VERY_LIKELY = 5,
}

export enum ContentType {
  ADULT = 'ADULT',
  SPOOF = 'SPOOF',
  VIOLENCE = 'VIOLENCE',
  RACY = 'RACY',
}

export const LikeliHoodRedflag = {
  [ContentType.ADULT]: 3,
  [ContentType.SPOOF]: 4,
  [ContentType.VIOLENCE]: 3,
  [ContentType.RACY]: 3,
};
