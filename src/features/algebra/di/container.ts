import { ExpresionRepositoryImpl } from "../data/repositories_impl/ExpressionRepositoryImp";
import { ApplyRule } from "../domain/usecases/ApplyRule";
import { GetAvailableRulesUseCase } from "../domain/usecases/GetAvailableRules";
import { TransformExpresionToLatex } from "../domain/usecases/TransformExpresionToLatex";

/**
 * Instancia del repositorio para manejar transformaciones de expresiones,
 * en este caso para convertir expresiones a distintos formatos (ej. LaTeX).
 */
const repoTransform = new ExpresionRepositoryImpl();

/**
 * Caso de uso para transformar expresiones algebraicas a formato LaTeX.
 * Recibe como dependencia el repositorio de transformaciones.
 */
export const transformToLatexUseCase = new TransformExpresionToLatex(repoTransform);

/**
 * Caso de uso que provee la lista de reglas algebraicas disponibles para aplicar.
 */
export const getAvailableRulesUseCase = new GetAvailableRulesUseCase();

/**
 * Caso de uso para aplicar una regla algebraica sobre una expresión.
 * Recibe como dependencia el caso de uso para transformación a LaTeX,
 * para mantener la expresión sincronizada en ese formato luego de aplicar la regla.
 */
export const applyRuleUseCase = new ApplyRule(transformToLatexUseCase);
