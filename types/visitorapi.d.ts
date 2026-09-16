declare module "visitorapi" {
  interface VisitorData {
    ipAddress: string;
    countryCode: string;
    countryName: string;
    region: string;
    city: string;
    cityLatLong: string;
    currencies: string[];
    languages: string[];
    browser: string;
    browserVersion: string;
    deviceBrand: string;
    deviceModel: string;
    deviceFamily: string;
    os: string;
    osVersion: string;
  }

  type VisitorError = string | Error;

  function VisitorAPI(projectId: string): Promise<VisitorData>;
  function VisitorAPI(
    projectId: string,
    onSuccess: (data: VisitorData) => void,
    onFailure?: (error: VisitorError) => void
  ): void;

  export default VisitorAPI;
}