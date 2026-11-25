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


/**
 * "Em poucas palavras": a porta de entrada de cada estudo de caso, logo depois do topo.
 * Dois caminhos lado a lado: um texto sem termos técnicos (para quem quer entender o que
 * mudou na vida de quem usa) e a lista do que interessa a quem é da área (stack e decisões).
 * Cada lado tem um atalho para a parte da página que responde aquela curiosidade.
 * `className` é a classe de seção da própria página (largura, espaçamento e linha de cima).
 */
export function ReadingGuide({ className = "", minutes, plain, plainLink, technical, technicalLink }) {
  return (
    <section className={`${className} ${sharedStyles.guide}`} aria-labelledby="guide-title" data-rail="Em poucas palavras" data-rail-icon="summary">
      <div className={sharedStyles.guideHead}>
        <p>Antes de começar</p>
        <h2 id="guide-title">Em poucas palavras</h2>
        {minutes && <span>Leitura de uns {minutes} min · escolha o seu caminho</span>}
      </div>
      <div className={sharedStyles.guideGrid}>
        <article className={sharedStyles.guidePlain}>
          <span><i aria-hidden="true">☺</i>Para todo mundo</span>
          {[].concat(plain).map((text) => <p key={text}>{text}</p>)}
          {plainLink && <a href={plainLink.href}>{plainLink.label} <b aria-hidden="true">↓</b></a>}
        </article>
        <article className={sharedStyles.guideTech}>
          <span><i aria-hidden="true">{"</>"}</i>Para quem é técnico</span>
          <ul>{technical.map((item) => <li key={item}>{item}</li>)}</ul>
          {technicalLink && <a href={technicalLink.href}>{technicalLink.label} <b aria-hidden="true">↓</b></a>}
        </article>
      </div>
    </section>
  );
}
