"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categoryLabels, projects, statusLabels, technologies, technologyFilters } from "../data/projects";
import TechnologyIcon from "./technology-icon";
import styles from "../page.module.css";

function TechnologyGroup({ technologyIds }) {
  const visibleTechnologyIds = technologyIds.slice(0, 4);
  const remainingCount = technologyIds.length - visibleTechnologyIds.length;

  return (
    <div className={styles.technologyGroup} data-count={visibleTechnologyIds.length} aria-label={`Tecnologias utilizadas: ${technologyIds.map((id) => technologies[id].label).join(", ")}`}>
      {visibleTechnologyIds.map((technologyId) => {
        return (
          <TechnologyIcon className={styles.technologyIcon} technology={technologyId} size="lg" key={technologyId} />
        );
      })}
      {remainingCount > 0 && <span className={styles.remainingTechnologies} aria-hidden="true">+{remainingCount}</span>}
    </div>
  );
}

const portfolioSections = [
  {
    id: "projetos",
    title: "Projetos",
    description: "Projetos autorais, automações, integrações, dashboards e soluções de dados.",
  },
  {
    id: "evolucoes-produto",
    title: "Evoluções de Produtos",
    description: "Funcionalidades e melhorias desenvolvidas para sistemas existentes.",
  },
];

export default function ProjectExplorer({ featuredOnly = false, showFilters = true }) {
  const [activeTechnology, setActiveTechnology] = useState("todos");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterControlsRef = useRef(null);
  const filterButtonRef = useRef(null);
  const visibleProjects = featuredOnly
    ? projects
      .filter((project) => project.featured)
      .sort((a, b) => a.featuredOrder - b.featuredOrder)
      .slice(0, 5)
    : activeTechnology === "todos"
      ? projects
      : projects.filter((project) => project.technologies.includes(activeTechnology));
  const visibleSections = featuredOnly
    ? [{ id: "destaques", projects: visibleProjects }]
    : portfolioSections
      .map((section) => ({
        ...section,
        projects: visibleProjects.filter((project) => (project.portfolioSection ?? "projetos") === section.id),
      }))
      .filter((section) => section.projects.length > 0);

  useEffect(() => {
    if (!filtersOpen) return undefined;

    function closeOnOutsideClick(event) {
      if (!filterControlsRef.current?.contains(event.target)) setFiltersOpen(false);
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setFiltersOpen(false);
        filterButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [filtersOpen]);

  function getTechnologyCount(technologyId) {
    if (technologyId === "todos") return projects.length;
    return projects.filter((project) => project.technologies.includes(technologyId)).length;
  }

  return (
    <>
      {showFilters && (
        <div className={styles.filterControls} ref={filterControlsRef} aria-label="Filtrar projetos por tecnologia">
          <button
            className={`${styles.allProjectsFilter} ${activeTechnology === "todos" ? styles.activeFilter : ""}`}
            type="button"
            aria-pressed={activeTechnology === "todos"}
            onClick={() => { setActiveTechnology("todos"); setFiltersOpen(false); }}
          >
            Todos <span className={styles.filterCount}>{projects.length}</span>
          </button>
          <div className={styles.filterPopoverWrap}>
            <button
              className={`${styles.filterToggle} ${activeTechnology !== "todos" ? styles.activeFilter : ""}`}
              ref={filterButtonRef}
              type="button"
              aria-label={`Filtrar projetos por tecnologia${activeTechnology === "todos" ? "" : `. Filtro atual: ${technologies[activeTechnology].label}`}`}
              aria-pressed={activeTechnology !== "todos"}
              aria-expanded={filtersOpen}
              aria-controls="technology-filter-options"
              onClick={() => setFiltersOpen((open) => !open)}
            >
              Filtrar <span className={styles.filterCount} aria-hidden="true">{filtersOpen ? "−" : "+"}</span>
            </button>
            {filtersOpen && (
              <div className={styles.filterPopover} id="technology-filter-options">
                {technologyFilters.map((technology) => (
                  <button
                    className={activeTechnology === technology.id ? styles.activeFilter : ""}
                    key={technology.id}
                    type="button"
                    aria-pressed={activeTechnology === technology.id}
                    onClick={() => { setActiveTechnology(technology.id); setFiltersOpen(false); }}
                  >
                    <TechnologyIcon technology={technology.id} size="sm" showLabel />
                    <span className={styles.filterCount}>{getTechnologyCount(technology.id)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.filterResults} key={featuredOnly ? "featured" : activeTechnology} aria-live={showFilters ? "polite" : undefined}>
        {visibleSections.map((section) => (
          <section className={styles.projectGroup} aria-labelledby={featuredOnly ? undefined : `portfolio-section-${section.id}`} key={section.id}>
            {!featuredOnly && (
              <div className={styles.projectGroupHeader}>
                <h2 id={`portfolio-section-${section.id}`}>{section.title}</h2>
                <p>{section.description}</p>
              </div>
            )}
            <div className={styles.caseList}>
              {section.projects.map((project) => (
                <Link className={styles.caseItem} data-reveal={featuredOnly ? "" : undefined} href={`/projetos/${project.slug}`} aria-label={`${project.title}. Ver página do projeto.`} key={project.slug}>
                  <span className={styles.caseIndex}>{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
                  <TechnologyGroup technologyIds={project.technologies} />
                  <div className={styles.caseContent}>
                    <div className={styles.projectMeta}>
                      <p className={styles.caseType}>{categoryLabels[project.category]}</p>
                      <span className={`${styles.projectStatus} ${project.status === "em-desenvolvimento" ? styles.developmentStatus : ""}`}>{statusLabels[project.status]}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className={styles.tags}>{project.technologies.map((technologyId) => <span key={technologyId}>{technologies[technologyId].label}</span>)}</div>
                  </div>
                  <span className={styles.caseArrow} aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
