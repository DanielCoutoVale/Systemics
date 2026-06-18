
import { type ExpressionDto } from "./ExpressionDto";

export class OrExpressionDto implements ExpressionDto {
    type: string = "or";
    expressions: ExpressionDto[];
    constructor(expressions: ExpressionDto[]) {
        this.expressions = expressions;
    }
}

export default OrExpressionDto;
