
import { type ExpressionDto } from "./ExpressionDto";

export class NotExpressionDto implements ExpressionDto {
    type: string = "not";
    expression: ExpressionDto;
    constructor(expression: ExpressionDto) {
        this.expression = expression;
    }
}

export default NotExpressionDto;
