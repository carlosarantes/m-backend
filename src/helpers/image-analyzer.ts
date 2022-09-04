import * as vision from '@google-cloud/vision';
const client = new vision.ImageAnnotatorClient();

const analyzeImage = async (filePath: string) => {
  try {
    // Performs safe search detection on the local file
    const [result] = await client.safeSearchDetection(
      './upload/1fbe9120e425bea8b65bd6c4b5226548',
    );

    const detections = result.safeSearchAnnotation;
    console.log('Safe search:');
    console.log(`Adult: ${detections.adult}`);
    console.log(`Medical: ${detections.medical}`);
    console.log(`Spoof: ${detections.spoof}`);
    console.log(`Violence: ${detections.violence}`);
    console.log(`Racy: ${detections.racy}`);
  } catch (error) {}
};

export { analyzeImage };
