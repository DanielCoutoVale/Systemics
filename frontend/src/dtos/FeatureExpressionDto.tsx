
import { type ExpressionDto } from "./ExpressionDto";

export class FeatureExpressionDto implements ExpressionDto {
    type: string = "feature";
    featureName: string;
    constructor(featureName: string) {
        this.featureName = featureName;
    }
}

export default FeatureExpressionDto;
