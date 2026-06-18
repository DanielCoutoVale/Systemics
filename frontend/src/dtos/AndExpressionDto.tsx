
import { type ExpressionDto } from "./ExpressionDto";

export class AndExpressionDto implements ExpressionDto {
    type: string = "and";
    expressions: ExpressionDto[];
    constructor(expressions: ExpressionDto[]) {
        this.expressions = expressions;
    }
}

export default AndExpressionDto;
