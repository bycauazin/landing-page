import Link from "next/link";
import CaseFloatingActions from "./case-floating-actions";
import styles from "./access-expiration-case.module.css";

const relationCards = [
  ["Empresa", "StudentCompany", "Validade do vínculo com uma empresa"],
  ["Tier", "StudentTier", "Nível de acesso atribuído ao aluno"],
  ["Turma", "StudentClass", "Participação em uma turma específica"],
  ["Módulo", "StudentModule", "Acesso individual a um módulo"],
];

const expirationFlow = [
  ["01", "Identificar", "Localizar relações com prazo vencido que ainda estão ativas."],
  ["02", "Aplicar regras", "Desativar o vínculo correto e tratar regras específicas, como o Tier Open."],
  ["03", "Registrar", "Gravar o tipo de relação, o alvo e a ação executada no histórico."],
  ["04", "Sincronizar", "Preparar e aplicar no Moodle as mudanças externas necessárias."],
];

const architecture = ["Endpoint autenticado", "Validação", "Controller", "ExpirationService", "ExpirationDao", "PostgreSQL", "Plano Moodle", "Moodle"];

const detectionCode = [
  "async function findToExpire({ Model }, options = {}) {",
  "    const { transaction } = options;",
  "    const where = {",
  "        expiresAt: { [Op.lte]: Sequelize.fn(\"NOW\") },",
  "        [Op.or]: [{ isActive: true }, { isActive: null }]",
  "    };",
  "",
  "    const rows = await Model.findAll({ where, transaction });",
  "    return { rows };",
  "}",
];

const previewCode = [
  "if (preview) {",
  "    results.push({",
  "        table: tableConfig.table,",
  "        count: toExpire.length,",
  "        preview: true",
  "    });",
  "    continue;",
  "}",
  "",
  "await ExpirationDao.expireByPrimaryKeys(",
  "    { Model, rows: toExpire },",
  "    options",
  ");",
];

const openTierCode = [
  "const existing = await StudentTier.findOne({",
  "    where: { studentId, tierId },",
  "    transaction",
  "});",
  "",
  "if (existing) {",
  "    await existing.update(",
  "        { isActive: true, expiresAt: null },",
  "        { transaction }",
  "    );",
  "    return { row: existing, created: false };",
  "}",
  "",
  "return StudentTier.create(",
  "    { studentId, tierId, isActive: true, expiresAt: null },",
  "    { transaction }",
  ");",
];

const tokenPattern = /(\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'|`[^`]*`|\b(?:async|await|const|return|if|true|false|null|new|throw|for|of|continue)\b|\b(?:findAll|findOne|update|create|expireByPrimaryKeys|fn)\b|\b(?:expiresAt|isActive|transaction|studentId|tierId|preview|rows|where|Model|options)\b)/g;

function highlightCode(line) {
  return line.split(tokenPattern).filter(Boolean).map((token, index) => {
    let kind = "plain";
    if (/^[\"'`]/.test(token)) kind = "string";
    else if (/^(async|await|const|return|if|true|false|null|new|throw|for|of|continue)$/.test(token)) kind = "keyword";
    else if (/^(findAll|findOne|update|create|expireByPrimaryKeys|fn)$/.test(token)) kind = "method";
    else if (/^(expiresAt|isActive|transaction|studentId|tierId|preview|rows|where|Model|options)$/.test(token)) kind = "property";
    return <span className={styles[kind]} key={`${token}-${index}`}>{token}</span>;
  });
}

function CodeEditor({ filename, label, lines }) {
  return (
    <figure className={styles.editor} aria-label={label}>
      <figcaption className={styles.editorBar}>
        <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.fileName}><b>JS</b>{filename}</span>
        <span className={styles.editorMenu} aria-hidden="true">•••</span>
      </figcaption>
      <div className={styles.codeScroller}>
        <pre className={styles.codeBlock}>{lines.map((line, index) => (
          <code className={styles.codeLine} key={`${filename}-${index}`}>
            <span className={styles.lineNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span>{highlightCode(line) || " "}</span>
          </code>
        ))}</pre>
      </div>
    </figure>
  );
}

function SectionHeading({ number, eyebrow, title, id }) {
  return (
    <div className={styles.sectionHeading}>
      <span>{number}</span>
      <div><p>{eyebrow}</p><h2 id={id}>{title}</h2></div>
    </div>
  );
}

function ArrowFlow({ items, label }) {
  return (
    <div className={styles.arrowFlow} aria-label={label}>
      {items.map((item, index) => (
        <div className={styles.arrowFlowItem} key={item}>
          <span>{item}</span>
          {index < items.length - 1 && <b aria-hidden="true">→</b>}
        </div>
      ))}
    </div>
  );
}

export default function AccessExpirationCase() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.header}>
        <Link className={styles.brand} href="/#projetos" aria-label="Voltar ao início"><span>C</span> bycauazin</Link>
        <Link className={styles.backLink} href="/projetos">← Todos os projetos</Link>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={styles.heroMeta}><p>Backend · Automação</p><span>Estudo de caso</span></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="case-title">Expiração automática de acessos</h1>
              <p>Automação backend criada para controlar a validade de diferentes vínculos dos alunos e sincronizar alterações de acesso entre o sistema interno e o Moodle.</p>
            </div>
            <div className={styles.heroVisual} aria-label="Um aluno conectado a quatro relações independentes">
              <div className={styles.visualLabel}>Expiração por vínculo</div>
              <div className={styles.studentNode}><span>Aluno</span><small>cadastro preservado</small></div>
              <div className={styles.relationOrbit}>
                {relationCards.map(([label], index) => <span key={label}><b>{String(index + 1).padStart(2, "0")}</b><strong>{label}</strong><i>expiresAt</i></span>)}
              </div>
              <div className={styles.visualRule}><i aria-hidden="true" />Cada relação tem seu próprio prazo</div>
            </div>
          </div>
          <div className={styles.tags} aria-label="Tecnologias do projeto">
            {["Node.js", "JavaScript", "React.js", "Sequelize", "PostgreSQL", "Moodle"].map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </section>

        <div className={styles.leadStatement}>
          <span>Decisão central</span>
          <blockquote>A expiração pertence à relação — não ao aluno inteiro.</blockquote>
        </div>

        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[
            ["01", "Problema", "problem-title"],
            ["02", "Fluxo", "flow-title"],
            ["03", "Preview", "preview-title"],
            ["04", "Tier Open", "open-title"],
            ["05", "Arquitetura", "architecture-title"],
            ["06", "Resultado", "result-title"],
          ].map(([number, label, target]) => <a href={`#${target}`} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↓</b></a>)}
        </nav>

        <section className={styles.section} aria-labelledby="problem-title">
          <SectionHeading number="01" eyebrow="Contexto e problema" title="Um aluno, diferentes prazos de acesso" id="problem-title" />
          <div className={styles.twoColumns}>
            <div className={styles.prose}>
              <p>Um mesmo aluno pode estar ligado a uma empresa, a um nível de acesso, a uma turma e a módulos específicos. Esses vínculos não precisam terminar juntos.</p>
              <p>Colocar uma única data no cadastro do aluno simplificaria demais a regra: ao vencer um acesso, outros ainda válidos poderiam ser afetados. A solução foi guardar <code>expiresAt</code> e <code>isActive</code> em cada relação.</p>
            </div>
            <aside className={styles.callout}><span>O que muda</span><strong>O vínculo expira. O aluno continua existindo.</strong><p>Cada relação é avaliada e atualizada de forma independente.</p></aside>
          </div>
          <div className={styles.relationGrid}>
            {relationCards.map(([label, model, description]) => <article key={model}><span>{label}</span><strong>{model}</strong><p>{description}</p><small>expiresAt · isActive</small></article>)}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="flow-title">
          <SectionHeading number="02" eyebrow="Como funciona" title="Da data vencida à ação correta" id="flow-title" />
          <ol className={styles.processGrid}>
            {expirationFlow.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
          </ol>
          <div className={styles.codeNarrative}>
            <div className={styles.codeCopy}><span>Regra no banco</span><h3>Vencido e ainda ativo</h3><p>O DAO recebe um model Sequelize e procura relações cuja data já chegou. O filtro também considera vínculos em que o estado ativo ainda está nulo, preservando o comportamento atual da aplicação.</p><p>A atualização posterior altera apenas <code>isActive</code>; a data original permanece no vínculo para rastreabilidade.</p></div>
            <CodeEditor filename="ExpirationDao.js" label="Trecho simplificado da detecção de relações expiradas" lines={detectionCode} />
          </div>
          <p className={styles.codeDisclaimer}>Trechos reais simplificados. Informações internas e sensíveis foram removidas.</p>
        </section>

        <section className={`${styles.section} ${styles.previewSection}`} aria-labelledby="preview-title">
          <SectionHeading number="03" eyebrow="Segurança operacional" title="Simular antes de aplicar" id="preview-title" />
          <div className={styles.previewGrid}>
            <div className={styles.previewPanel}><span>preview = 1</span><strong>Analisar</strong><ul><li>detecta relações vencidas;</li><li>monta o plano de ações;</li><li>faz as consultas necessárias;</li><li>não persiste mudanças;</li><li>não adiciona membros no Moodle.</li></ul></div>
            <div className={`${styles.previewPanel} ${styles.applyPanel}`}><span>preview = 0</span><strong>Aplicar</strong><ul><li>desativa os vínculos vencidos;</li><li>trata a regra do Tier Open;</li><li>registra o histórico;</li><li>executa o plano de sincronização.</li></ul></div>
          </div>
          <div className={styles.codeNarrativeReverse}>
            <CodeEditor filename="ExpirationService.js" label="Trecho simplificado do modo preview" lines={previewCode} />
            <div className={styles.codeCopy}><span>Decisão explícita</span><h3>Planejar não significa alterar</h3><p>O mesmo fluxo identifica o impacto nos dois modos. Quando o preview está ativo, ele relata o que faria e segue para a próxima relação sem chamar a persistência.</p><p>A resposta informa o plano e quantas inclusões seriam realizadas no Moodle.</p></div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="open-title">
          <SectionHeading number="04" eyebrow="Regra de negócio" title="Do Tier expirado para o nível Open" id="open-title" />
          <div className={styles.twoColumns}>
            <div className={styles.prose}><p>Quando um vínculo de Tier expira, a relação anterior fica inativa e mantém sua data de expiração. Em seguida, o sistema localiza o Tier Open pelo nome e garante que o aluno tenha esse vínculo ativo.</p><p>Se o vínculo Open já existe, ele é reativado e fica sem prazo de expiração. Se ainda não existe, é criado. As duas mudanças deixam registros próprios no histórico: expiração e movimentação para Open.</p></div>
            <div className={styles.openFlow}><span>Tier anterior<small>isActive: false</small></span><b>→</b><span>Histórico<small>EXPIRE + MOVE_TO_OPEN</small></span><b>→</b><span>Tier Open<small>reutilizar ou criar</small></span></div>
          </div>
          <div className={styles.codeNarrative}>
            <div className={styles.codeCopy}><span>Execução recorrente</span><h3>Sem duplicar o vínculo Open</h3><p>A rotina procura primeiro pela combinação aluno + Tier. Reexecutar o processo não cria uma nova relação quando ela já existe: o registro é reutilizado e colocado no estado esperado.</p></div>
            <CodeEditor filename="ExpirationDao.js" label="Trecho simplificado da ativação do Tier Open" lines={openTierCode} />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="architecture-title">
          <SectionHeading number="05" eyebrow="Arquitetura" title="Responsabilidades separadas, fluxo rastreável" id="architecture-title" />
          <ArrowFlow items={architecture} label="Fluxo do endpoint até o Moodle" />
          <div className={styles.architectureGrid}>
            <article><span>Entrada</span><h3>Endpoint, autorização e validação</h3><p>Uma rota autenticada valida o parâmetro de preview antes de entregar a operação ao controller.</p></article>
            <article><span>Orquestração</span><h3>Controller + transaction</h3><p>O controller abre a transaction Sequelize, inicia o service e monta a resposta com plano e execução.</p></article>
            <article><span>Regra</span><h3>Service</h3><p>Coordena as relações, o Tier Open, o histórico e a construção do plano de sincronização.</p></article>
            <article><span>Persistência</span><h3>DAO</h3><p>Consulta vencimentos, atualiza os vínculos pela chave real do model e grava o histórico.</p></article>
          </div>
          <div className={styles.boundaryNote}><span>Limite transacional</span><p>A transaction controla as mudanças no banco local. O Moodle é um sistema externo: uma operação aceita por sua API não é desfeita automaticamente por um rollback do Sequelize.</p></div>

          <div className={styles.challengeHeader}><span>Desafios técnicos</span><h3>Detalhes que impedem uma automação ingênua</h3></div>
          <div className={styles.challengeGrid}>
            <article><b>01</b><h4>Relações independentes</h4><p>Não existe apenas “aluno expirado”; cada tipo de vínculo precisa ser avaliado separadamente.</p></article>
            <article><b>02</b><h4>Chaves reais do model</h4><p>O DAO lê as chaves primárias configuradas no Sequelize, sem assumir que toda associação é identificada apenas por um campo chamado <code>id</code>.</p></article>
            <article><b>03</b><h4>Reexecução segura</h4><p>O Open existente é reutilizado, e as ações Moodle são deduplicadas antes da aplicação.</p></article>
            <article><b>04</b><h4>Histórico preservado</h4><p>Cada expiração registra relação, alvo, ação e contexto; a data original não é apagada.</p></article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="moodle-title">
          <SectionHeading number="06" eyebrow="Integração Moodle" title="Do estado local para o cohort Open" id="moodle-title" />
          <div className={styles.twoColumns}>
            <div className={styles.prose}><p>Para Tiers expirados, o service cria um plano de sincronização, resolve o usuário correspondente no Moodle e localiza o cohort Open. As ações são validadas e deduplicadas antes do envio.</p><p>Na implementação atual, esse fluxo adiciona o aluno ao cohort Open. A remoção do cohort anterior não faz parte deste plano e, por isso, não é representada como comportamento do case.</p></div>
            <div className={styles.syncCard}><span>Plano atual</span><div>Tier expirado</div><b>↓</b><div>Resolver usuário e cohort</div><b>↓</b><div>ADD_TO_COHORT</div><b>↓</b><div>Moodle</div></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.resultSection}`} aria-labelledby="result-title">
          <SectionHeading number="07" eyebrow="Participação e resultado" title="Regra operacional transformada em processo controlado" id="result-title" />
          <div className={styles.roleResultGrid}>
            <article><span>Minha participação</span><p>Atuei na análise da regra de negócio, na modelagem da expiração por relação e na implementação backend com Node.js e Sequelize. O trabalho incluiu a separação entre Service e DAO, o modo preview, o tratamento do Tier Open, o histórico, as transactions e a integração com cohorts do Moodle. Também implementei a interface de cadastro em React.js — nesta tela o usuário, ao cadastrar um aluno ou empresa, informa a data de expiração do vínculo.</p></article>
            <article><span>Resultado</span><p>A expiração passou a considerar o prazo de cada vínculo individualmente, com um fluxo mais previsível e auditável. A automação reduz o tratamento manual, preserva o histórico e permite validar o impacto antes de aplicar mudanças.</p></article>
          </div>
          <div className={styles.outcomeGrid}>
            {["Menos tratamento manual", "Regras aplicadas por relação", "Histórico preservado", "Preview antes da aplicação", "Integração local → Moodle", "Processo auditável"].map((item) => <span key={item}>{item}</span>)}
          </div>

          <div className={styles.learningBlock}>
            <span>Aprendizados</span>
            <div><article><strong>Modelagem importa</strong><p>A data precisava pertencer ao vínculo para representar a regra real.</p></article><article><strong>Reexecutar faz parte do desenho</strong><p>Uma automação precisa reconhecer estados já tratados sem gerar duplicidade.</p></article><article><strong>Sistemas têm limites diferentes</strong><p>Banco local e API externa não compartilham o mesmo rollback.</p></article><article><strong>Preview reduz risco</strong><p>Separar análise de aplicação torna a operação mais segura.</p></article></div>
          </div>
          <div className={styles.techGrid} aria-label="Tecnologias confirmadas no projeto">
            {["Node.js", "JavaScript", "React.js", "Express", "Sequelize", "PostgreSQL", "REST APIs", "Moodle Web Services"].map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </section>
      </main>

      <CaseFloatingActions sections={[
        { href: "#problem-title", label: "Contexto e problema" }, { href: "#flow-title", label: "Fluxo de expiração" },
        { href: "#preview-title", label: "Simulação segura" }, { href: "#open-title", label: "Regra do Tier Open" },
        { href: "#architecture-title", label: "Arquitetura" }, { href: "#moodle-title", label: "Integração Moodle" },
        { href: "#result-title", label: "Resultado" },
      ]} />
      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><Link href="/projetos">Ver todos os projetos ↑</Link></footer>
    </div>
  );
}
