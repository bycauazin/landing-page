import Link from "next/link";
import CaseFloatingActions from "./case-floating-actions";
import styles from "./dashboard-sales-case.module.css";

const daxCode = [
  "Faturamento = SUM('Vendas'[Total])",
  "Custo Total = SUM('Vendas'[Tot Cst])",
  "Lucro Total = SUM('Vendas'[Lucro])",
  "",
  "Margem =",
  "    DIVIDE([Lucro Total], [Faturamento], 0)",
  "",
  "Pedidos = DISTINCTCOUNT('Vendas'[Pedido])",
  "Ticket Médio = DIVIDE([Faturamento], [Pedidos], 0)",
];

const tokenPattern = /(\"(?:[^\"\\]|\\.)*\"|'(?:[^'\\]|\\.)*'|\b(?:SUM|DIVIDE|DISTINCTCOUNT)\b|\b(?:Faturamento|Custo Total|Lucro Total|Margem|Pedidos|Ticket Médio|Vendas|Total|Tot Cst|Lucro|Pedido)\b|\d+)/g;

function highlightDax(line) {
  return line.split(tokenPattern).filter(Boolean).map((token, index) => {
    let kind = "plain";
    if (/^[\"']/.test(token)) kind = "string";
    else if (/^(SUM|DIVIDE|DISTINCTCOUNT)$/.test(token)) kind = "method";
    else if (/^\d+$/.test(token)) kind = "number";
    else if (/^(Faturamento|Custo Total|Lucro Total|Margem|Pedidos|Ticket Médio|Vendas|Total|Tot Cst|Lucro|Pedido)$/.test(token)) kind = "property";
    return <span className={styles[kind]} key={`${token}-${index}`}>{token}</span>;
  });
}

function DaxEditor() {
  return (
    <figure className={styles.editor} aria-label="Medidas DAX simplificadas utilizadas no dashboard">
      <figcaption><span aria-hidden="true"><i /><i /><i /></span><b>DAX</b><strong>Medidas comerciais</strong></figcaption>
      <div><pre>{daxCode.map((line, index) => <code key={index}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{highlightDax(line) || " "}</span></code>)}</pre></div>
    </figure>
  );
}

function SectionHeading({ number, eyebrow, title, id }) {
  return <div className={styles.sectionHeading}><span>{number}</span><div><p>{eyebrow}</p><h2 id={id}>{title}</h2></div></div>;
}

function DashboardMockup() {
  const bars = [42, 58, 49, 72];
  return (
    <div className={styles.dashboardMockup} aria-label="Representação demonstrativa do dashboard com valores fictícios">
      <div className={styles.mockHeader}><div><span>Dashboard de Vendas</span><small>Visão comercial · dados fictícios</small></div><b>POWER BI</b></div>
      <div className={styles.mockFilters}>{["Mês: Todos", "Cliente: Todos", "Produto: Todos", "Origem: Todas"].map((filter) => <span key={filter}>{filter}<b>⌄</b></span>)}</div>
      <div className={styles.mockKpis}>
        {[['Faturamento','R$ 842 mil'],['Custo total','R$ 681 mil'],['Lucro','R$ 126 mil'],['Margem','15,0%']].map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong><i /></article>)}
      </div>
      <div className={styles.mockMiddle}>
        <article className={styles.monthChart}><header><span>Evolução mensal</span><small>Faturamento · custo · lucro</small></header><div>{bars.map((height, index) => <div key={index}><i style={{ height: `${height}%` }} /><i style={{ height: `${height - 10}%` }} /><i style={{ height: `${Math.max(12, height - 35)}%` }} /><small>{["Mar", "Abr", "Mai", "Jun"][index]}</small></div>)}</div></article>
        <article className={styles.donutPanel}><header><span>Distribuição</span><small>Por pagamento</small></header><div className={styles.donut}><strong>100%</strong></div><ul><li><i />Prazo</li><li><i />À vista</li><li><i />Não informado</li></ul></article>
      </div>
      <div className={styles.mockBottom}>
        <article><header><span>Top produtos</span><small>Faturamento</small></header>{[["Produto A",88],["Produto B",71],["Produto C",57],["Produto D",43]].map(([name,width]) => <div className={styles.rankBar} key={name}><span>{name}</span><i style={{ width: `${width}%` }} /></div>)}</article>
        <article><header><span>Ranking de clientes</span><small>Visão consolidada</small></header>{["Cliente Alfa", "Cliente Beta", "Cliente Gama", "Cliente Delta"].map((name, index) => <div className={styles.clientRow} key={name}><b>0{index + 1}</b><span>{name}</span><strong>R$ —</strong></div>)}</article>
      </div>
    </div>
  );
}

export default function DashboardSalesCase() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.header}><Link className={styles.brand} href="/#projetos"><span>C</span> bycauazin</Link><Link className={styles.backLink} href="/projetos">← Todos os projetos</Link></header>
      <main>
        <section className={styles.hero} aria-labelledby="case-title">
          <div className={styles.heroMeta}><p>Power BI · Business Intelligence</p><span>Estudo de caso</span></div>
          <div className={styles.heroGrid}>
            <div><h1 id="case-title">Dashboard de vendas</h1><p className={styles.heroSummary}>Painel comercial criado para transformar uma base consolidada em uma leitura clara de faturamento, custo, lucro, margem, produtos e clientes.</p></div>
            <div className={styles.heroAside}><span>Projeto PBIP</span><strong>1 página vertical</strong><div><i />Tema escuro</div><div><i />Visuais nativos</div><div><i />Modelo semântico</div><small>Estrutura confirmada no projeto original.</small></div>
          </div>
          <div className={styles.tags}>{["Power BI", "Power Query", "DAX", "Modelagem", "Visualização de dados"].map((tag) => <span key={tag}>{tag}</span>)}</div>
        </section>

        <div className={styles.leadStatement}><span>Decisão central</span><blockquote>O dashboard organiza a leitura comercial: do resultado geral até o produto ou cliente que explica esse resultado.</blockquote></div>

        <nav className={styles.caseNav} aria-label="Etapas do estudo de caso">
          {[["01","Problema","problem-title"],["02","Dados","data-title"],["03","Indicadores","metrics-title"],["04","Dashboard","dashboard-title"],["05","Decisões","decisions-title"],["06","Resultado","result-title"]].map(([number,label,target]) => <a href={`#${target}`} key={number}><span>{number}</span><strong>{label}</strong><b>↓</b></a>)}
        </nav>

        <section className={styles.section} aria-labelledby="problem-title">
          <SectionHeading number="01" eyebrow="Contexto e problema" title="Uma base extensa não é o mesmo que uma visão comercial" id="problem-title" />
          <div className={styles.twoColumns}><div className={styles.prose}><p>A base reunia pedidos, clientes, produtos, quantidade, custo, valor de venda, lucro, forma de pagamento e origem dos itens. Consultar linhas isoladas não mostrava com clareza como o resultado se distribuía.</p><p>O desafio foi organizar essas informações em uma experiência única: primeiro os indicadores principais, depois a evolução no tempo e, por fim, os rankings e detalhamentos que ajudam a explicar o desempenho.</p></div><aside className={styles.callout}><span>Da base à pergunta</span><strong>Quanto vendemos — e o que explica esse resultado?</strong><p>O painel conecta visão executiva e análise detalhada na mesma página.</p></aside></div>
          <div className={styles.questionGrid}>{["Como o resultado evolui por mês?","Quais produtos concentram faturamento?","Quais clientes lideram o ranking?","Como margem e lucro se comportam?"].map((item,index) => <article key={item}><span>0{index+1}</span><p>{item}</p></article>)}</div>
        </section>

        <section className={styles.section} aria-labelledby="data-title">
          <SectionHeading number="02" eyebrow="Preparação dos dados" title="Uma fonte consolidada, tratada antes da análise" id="data-title" />
          <div className={styles.dataFlow}><span>Base Excel</span><b>→</b><span>Power Query</span><b>→</b><span>Normalização</span><b>→</b><span>Modelo semântico</span><b>→</b><span>Medidas DAX</span></div>
          <div className={styles.dataCards}><article><span>Power Query</span><h3>Correções controladas</h3><p>A consulta mantém a base original e aplica normalizações pontuais em valores de origem e pagamento.</p></article><article><span>Confidencialidade</span><h3>Demonstração segura</h3><p>Esta página recria a experiência com números e nomes fictícios, sem publicar os totais ou registros da fonte.</p></article><article><span>Modelo</span><h3>Camada de negócio</h3><p>As medidas separam a lógica dos indicadores da apresentação visual do relatório.</p></article></div>
        </section>

        <section className={styles.section} aria-labelledby="metrics-title">
          <SectionHeading number="03" eyebrow="Indicadores" title="Medidas que traduzem a operação comercial" id="metrics-title" />
          <div className={styles.metricGrid}>{["Faturamento","Custo total","Lucro total","Margem","Quantidade","Pedidos distintos","Ticket médio","Ranking de clientes"].map((metric,index) => <span key={metric}><b>{String(index+1).padStart(2,"0")}</b>{metric}</span>)}</div>
          <div className={styles.codeNarrative}><div><span>DAX</span><h3>Cálculos separados da interface</h3><p>Faturamento, custo e lucro partem de agregações explícitas. Margem e ticket médio usam <code>DIVIDE</code>, evitando que a regra dependa de cálculos visuais improvisados.</p><p>Trechos reais simplificados. Nomes e dados sensíveis não são exibidos.</p></div><DaxEditor /></div>
        </section>

        <section className={styles.section} aria-labelledby="dashboard-title">
          <SectionHeading number="04" eyebrow="Experiência visual" title="Uma página, diferentes níveis de leitura" id="dashboard-title" />
          <DashboardMockup />
          <p className={styles.mockDisclaimer}>Representação demonstrativa construída em HTML/CSS. Os valores, clientes e produtos são fictícios.</p>
          <div className={styles.readingGrid}><article><span>Visão geral</span><p>Cards destacam faturamento, custo, lucro e margem.</p></article><article><span>Evolução</span><p>Gráficos mensais permitem comparar os principais valores ao longo do período.</p></article><article><span>Distribuição</span><p>Origem e pagamento ajudam a entender a composição do faturamento.</p></article><article><span>Detalhamento</span><p>Tabelas e rankings conectam o resultado aos produtos e clientes.</p></article></div>
        </section>

        <section className={styles.section} aria-labelledby="decisions-title">
          <SectionHeading number="05" eyebrow="Filtros e decisões" title="Do indicador agregado ao recorte necessário" id="decisions-title" />
          <div className={styles.filterGrid}>{["Mês","Cliente","Produto","Classificação","Origem","Pagamento","Categoria"].map((filter) => <span key={filter}>{filter}<b>⌄</b></span>)}</div>
          <div className={styles.twoColumns}><div className={styles.prose}><p>Os filtros permitem partir da leitura geral e investigar um período, cliente, produto ou característica comercial específica. Todos os visuais permanecem na mesma página para preservar o contexto durante a análise.</p></div><aside className={styles.callout}><span>Leitura orientada</span><strong>Resumo → tendência → distribuição → detalhe</strong><p>A hierarquia reduz a necessidade de procurar informações em páginas desconectadas.</p></aside></div>
        </section>

        <section className={`${styles.section} ${styles.resultSection}`} aria-labelledby="result-title">
          <SectionHeading number="06" eyebrow="Participação e resultado" title="Uma base comercial transformada em narrativa visual" id="result-title" />
          <div className={styles.roleResultGrid}><article><span>Minha participação</span><p>Atuei na preparação e validação da base, nas transformações do Power Query, na criação das medidas DAX, na organização da página e na escolha dos visuais e filtros que estruturam a análise comercial.</p></article><article><span>Resultado</span><p>O projeto passou a reunir indicadores, evolução, distribuição, rankings e detalhamento em uma única experiência. O painel facilita a leitura dos resultados sem alterar a fonte original e mantém a lógica dos indicadores documentada no modelo.</p></article></div>
          <div className={styles.outcomeGrid}>{["Indicadores centralizados","Comparação mensal","Ranking de clientes","Análise de produtos","Filtros comerciais","Base preservada"].map((item) => <span key={item}>{item}</span>)}</div>
          <div className={styles.learningBlock}><span>Aprendizados</span><div><article><strong>Hierarquia antes da decoração</strong><p>A ordem dos visuais define como o resultado será interpretado.</p></article><article><strong>Medidas precisam ser explícitas</strong><p>DAX concentra a regra e mantém os visuais consistentes.</p></article><article><strong>Detalhe com contexto</strong><p>Rankings e tabelas funcionam melhor depois da visão geral.</p></article><article><strong>Dado seguro também comunica</strong><p>Uma recriação fictícia preserva a experiência sem expor a fonte.</p></article></div></div>
          <div className={styles.techGrid}>{["Power BI","Power Query","DAX","PBIP","Modelo semântico","Excel","Visualização de dados"].map((tech) => <span key={tech}>{tech}</span>)}</div>
        </section>
      </main>
      <CaseFloatingActions sections={[
        { href: "#problem-title", label: "Contexto e problema" }, { href: "#data-title", label: "Preparação dos dados" },
        { href: "#metrics-title", label: "Indicadores" }, { href: "#dashboard-title", label: "Experiência visual" },
        { href: "#decisions-title", label: "Filtros e decisões" }, { href: "#result-title", label: "Resultado" },
      ]} />
      <footer className={styles.footer}><span>© {new Date().getFullYear()} Cauã · bycauazin</span><Link href="/projetos">Ver todos os projetos ↑</Link></footer>
    </div>
  );
}
