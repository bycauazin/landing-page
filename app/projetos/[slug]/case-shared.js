import sharedStyles from "./case-shared.module.css";

export function LeadQuote({ text }) {
  return (
    <section className={sharedStyles.leadQuoteWrap}>
      <p className={sharedStyles.leadQuote}>{text}</p>
    </section>
  );
}

export function ImpactCards({ cards }) {
  return (
    <section className={sharedStyles.impactGrid} aria-label="Resumo do problema, da solução e do impacto">
      {cards.map((card) => (
        <article key={card.title} className={sharedStyles.impactCard}>
          <span>{card.title}</span>
          <p>{card.text}</p>
        </article>
      ))}
    </section>
  );
}

export function BeforeAfter({ before, after, beforeLabel = "Antes", afterLabel = "Depois" }) {
  return (
    <section className={sharedStyles.beforeAfter} aria-label="Comparação entre processo antes e depois">
      <div className={sharedStyles.beforeAfterColumn}>
        <p>{beforeLabel}</p>
        <div className={sharedStyles.flowStack}>
          {before.map((item) => (
            <div key={item} className={sharedStyles.flowNode}>{item}</div>
          ))}
        </div>
      </div>

      <div className={sharedStyles.beforeAfterDivider} aria-hidden="true">→</div>

      <div className={sharedStyles.beforeAfterColumn}>
        <p>{afterLabel}</p>
        <div className={sharedStyles.flowStack}>
          {after.map((item) => (
            <div key={item} className={`${sharedStyles.flowNode} ${sharedStyles.flowNodeAccent}`}>{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FlowDiagram({ steps }) {
  return (
    <section className={sharedStyles.flowDiagram} aria-label="Como a solução funciona">
      <div className={sharedStyles.sectionHeader}>
        <span>Como funciona</span>
        <h3>Fluxo da solução</h3>
      </div>

      <div className={sharedStyles.flowRow}>
        {steps.map((step, index) => (
          <div key={step.label} className={sharedStyles.flowRowItem}>
            <div className={sharedStyles.flowStep}>
              <strong>{step.label}</strong>
              <small>{step.text}</small>
            </div>
            {index < steps.length - 1 && <span className={sharedStyles.arrow}>↓</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function RoadmapStatus({ items }) {
  return (
    <section className={sharedStyles.statusBoard} aria-label="Status do projeto">
      <div className={sharedStyles.sectionHeader}>
        <span>Status</span>
        <h3>Evolução do projeto</h3>
      </div>
      <div className={sharedStyles.statusGrid}>
        {items.map((item) => (
          <article key={item.label} className={`${sharedStyles.statusCard} ${sharedStyles[item.variant]}`}>
            <span>{item.label}</span>
            <ul>
              {item.items.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
