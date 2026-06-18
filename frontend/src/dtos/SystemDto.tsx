
import { type ExpressionDto } from "./ExpressionDto";
import FeatureDto from "./FeatureDto";

class SystemDto {
    id: number;
    name: string;
    description: string;
    region: string;
    metafunction: string;
    inputs: ExpressionDto;
    outputs: FeatureDto[];
    constructor(id: number, name: string, description: string, region: string, metafunction: string, inputs: ExpressionDto, outputs: FeatureDto[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.region = region;
        this.metafunction = metafunction;
        this.inputs = inputs;
        this.outputs = outputs;
    }
}

export default SystemDto;
