export interface EquationStep {
  description: string;
  latexBefore: string;
  latexAfter: string;
  ruleName: string;
  isFinal?: boolean;
  expressionBefore?: string;
  expressionAfter?: string;
}

/**

  Representa un paso en la resolución de una ecuación algebraica.
  Cada paso contiene información textual, simbólica y en LaTeX que describe
  cómo se transforma la expresión usando una regla específica.
 /
export interface EquationStep {
  /**
    Descripción textual del paso realizado (explicación para el usuario).
    Ejemplo: "Se aplicó la propiedad distributiva"
   /
  description: string;

  /**
    Representación en LaTeX de la expresión antes de aplicar la regla.
    Útil para renderizado visual de la expresión previa.
   /
  latexBefore: string;

    
    Representación en LaTeX de la expresión después de aplicar la regla.
    Permite mostrar visualmente el resultado del paso.
   /
  latexAfter: string;

  /**
    Nombre técnico o identificador de la regla aplicada.
    Ejemplo: "DistributiveRule", "CombineLikeTermsRule"
   /
  ruleName: string;

  /**
    (Opcional) Indica si este es el paso final en la resolución de la ecuación.
    Útil para marcar cuando ya se ha alcanzado la solución.
   /
  isFinal?: boolean;

  /**
    (Opcional) Expresión cruda en string antes de aplicar la regla.
    Puede ser usada para depuración o lógica interna.
   /
  expressionBefore?: string;

  /**
    (Opcional) Expresión cruda en string después de aplicar la regla.
    Permite seguimiento exacto de los cambios simbólicos.
   /
  expressionAfter?: string;
}


**/