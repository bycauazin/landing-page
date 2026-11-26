import { Icon } from "./case-icons";
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

      <div className={sharedStyles.beforeAfterDivider} aria-hidden="true"><Icon name="arrow" /></div>

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

/**
 * Fluxo no padrão do Cacau: ícones em círculos ligados por uma linha, sem números.
 * steps: [{ icon?, label, note? }] ou textos. `vertical` para colunas estreitas;
 * `muted` para o "antes" (processo manual), em cinza.
 */
export function Pipeline({ steps, vertical = false, muted = false, label, className = "" }) {
  return (
    <ol className={`${sharedStyles.pipeline} ${vertical ? sharedStyles.pipelineVertical : ""} ${muted ? sharedStyles.pipelineMuted : ""} ${className}`} aria-label={label}>
      {steps.map((step) => {
        const item = typeof step === "string" ? { label: step } : step;
        return (
          <li key={item.label}>
            <span className={sharedStyles.pipelineIcon}><Icon name={item.icon} label={item.label} /></span>
            <strong>{item.label}</strong>
            {item.note && <small>{item.note}</small>}
          </li>
        );
      })}
    </ol>
  );
}

export function FlowDiagram({ steps }) {
  return (
    <section className={sharedStyles.flowDiagram} aria-label="Como a solução funciona">
      <div className={sharedStyles.sectionHeader}>
        <span>Como funciona</span>
        <h3>Fluxo da solução</h3>
      </div>
      <Pipeline steps={steps.map((step) => ({ icon: step.icon, label: step.label, note: step.text }))} />
    </section>
  );
}


/**
 * "O projeto em um minuto": a porta de entrada de cada estudo de caso, logo depois do topo.
 * Dois cartões lado a lado: "Em poucas palavras" (a história, sem jargão) e "Parte técnica"
 * (stack e decisões). Os nomes não separam leitores: cada um lê o que quiser.
 * Cada lado tem um atalho para a parte da página que responde aquela curiosidade.
 * `className` é a classe de seção da própria página (largura, espaçamento e linha de cima).
 */
export function ReadingGuide({ className = "", minutes, highlight, plain, plainLink, technical, technicalLink }) {
  return (
    <section className={`${className} ${sharedStyles.guide}`} aria-labelledby="guide-title" data-rail="Resumo" data-rail-icon="summary">
      <div className={sharedStyles.guideHead}>
        <p>Antes de começar</p>
        <h2 id="guide-title">O projeto em um minuto</h2>
        {minutes && <span><Icon name="clock" /> Leitura de uns {minutes} min</span>}
      </div>
      {highlight && (
        <a className={sharedStyles.highlight} href={highlight.href}>
          <span className={sharedStyles.highlightIcon}><Icon name={highlight.icon ?? "result"} /></span>
          <span className={sharedStyles.highlightValue}>{highlight.prefix && <small>{highlight.prefix}</small>}<strong>{highlight.value}</strong></span>
          <span className={sharedStyles.highlightText}><b>Resultado</b>{highlight.text}</span>
          <Icon name="down" className={sharedStyles.highlightGo} />
        </a>
      )}
      <div className={sharedStyles.guideGrid}>
        <article className={sharedStyles.guidePlain}>
          <span><i><Icon name="summary" /></i>Em poucas palavras</span>
          {[].concat(plain).map((text) => <p key={text}>{text}</p>)}
          {plainLink && <a href={plainLink.href}>{plainLink.label} <Icon name="down" /></a>}
        </article>
        <article className={sharedStyles.guideTech}>
          <span><i><Icon name="code" /></i>Parte técnica</span>
          <ul>{technical.map((item) => <li key={item}>{item}</li>)}</ul>
          {technicalLink && <a href={technicalLink.href}>{technicalLink.label} <Icon name="down" /></a>}
        </article>
      </div>
    </section>
  );
}
