import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Layout from "../components/common/Layout.jsx";
import SEO from "../components/seo/SEO";
import StructuredData from "../components/seo/StructuredData";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { SEO_CONSTANTS } from "../utils/seoConstants";
import { FaCalendarAlt, FaUser, FaTag, FaSearch } from "react-icons/fa";

/* Styled Components */
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const BlogLayout = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogMain = styled.div``;

const BlogSidebar = styled.div``;

const SearchBox = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: none;
  outline: none;
`;

const SearchButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 0 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #0055aa;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.h3`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #0066cc;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 0.8rem;
  a {
    color: #333;
    text-decoration: none;
    &:hover {
      color: #0066cc;
    }
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.a`
  display: inline-block;
  background-color: #f0f0f0;
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  text-decoration: none;
  font-size: 0.9rem;
  &:hover {
    background-color: #0066cc;
    color: white;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BlogPost = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const PostImage = styled.div`
  height: 200px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const PostContent = styled.div`
  padding: 1.5rem;
`;

const PostTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.3rem;
  a {
    color: #333;
    text-decoration: none;
    &:hover {
      color: #0066cc;
    }
  }
`;

const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.3rem;
  }
`;

const PostExcerpt = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const ReadMoreButton = styled(Link)`
  display: inline-block;
  background-color: #0066cc;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    background-color: #0055aa;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  margin: 0 0.3rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.active ? "#0066cc" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.active ? "#0055aa" : "#f5f5f5")};
  }
`;

/* Componente Blog */
const Blog = () => {
  // Dati di esempio per gli articoli del blog
  const blogArticles = [
    {
      id: "article1",
      title: "Come risparmiare energia in casa: 10 consigli pratici",
      date: "15 Marzo 2023",
      author: "Admin",
      category: "Risparmio",
      excerpt:
        "Scopri come ridurre i consumi energetici della tua casa con semplici accorgimenti quotidiani che ti permetteranno di risparmiare sulla bolletta...",
      url: "#article1",
    },
    {
      id: "article2",
      title: "Il futuro dell'energia rinnovabile in Italia",
      date: "28 Febbraio 2023",
      author: "Admin",
      category: "Rinnovabili",
      excerpt:
        "L'Italia sta investendo sempre più nelle energie rinnovabili. Analisi delle prospettive future e delle opportunità per consumatori e aziende...",
      url: "#article2",
    },
    {
      id: "article3",
      title: "Come leggere correttamente la bolletta dell'energia",
      date: "10 Febbraio 2023",
      author: "Admin",
      category: "Bollette",
      excerpt:
        "La bolletta dell'energia può sembrare complessa, ma con questa guida imparerai a comprenderla facilmente, identificando tutte le voci di spesa...",
      url: "#article3",
    },
    {
      id: "article4",
      title: "Pompe di calore: vantaggi e svantaggi",
      date: "25 Gennaio 2023",
      author: "Admin",
      category: "Tecnologia",
      excerpt:
        "Le pompe di calore sono sempre più diffuse come soluzione per il riscaldamento e il raffreddamento domestico. Ecco i pro e i contro di questa tecnologia...",
      url: "#article4",
    },
  ];

  // Prepara i dati strutturati per il blog
  const blogStructuredData = {
    "@type": "Blog",
    name: "Blog Solida-Energia",
    description:
      "Ultime novità dal mondo dell'energia, consigli per il risparmio e aggiornamenti da Solida-Energia.",
    url: "https://solida-energia.it/blog",
    blogPost: blogArticles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      datePublished: article.date,
      author: {
        "@type": "Person",
        name: article.author,
      },
      articleSection: article.category,
      url: `https://solida-energia.it${article.url}`,
      description: article.excerpt,
    })),
  };

  return (
    <Layout
      title="Blog & News"
      description="Leggi le ultime novità dal mondo dell'energia, consigli per il risparmio e aggiornamenti da Solida-Energia."
    >
      <SEO
        title="Blog & News"
        description="Scopri le ultime novità dal mondo dell'energia, consigli per il risparmio energetico e aggiornamenti da Solida-Energia."
        canonical="/blog"
        keywords={[
          ...SEO_CONSTANTS.DEFAULT_KEYWORDS,
          "blog",
          "news",
          "articoli",
          "risparmio energetico",
          "rinnovabili",
        ]}
      />

      <StructuredData type="Blog" data={blogStructuredData} />

      <PageContainer>
        <ErrorBoundary>
          <PageTitle>Blog & News</PageTitle>
          <BlogLayout>
            <BlogMain>
              <ErrorBoundary>
                <BlogGrid>
                  {blogArticles.map((article) => (
                    <BlogPost key={article.id}>
                      <PostImage>Immagine Articolo</PostImage>
                      <PostContent>
                        <PostTitle>
                          <a href={article.url}>{article.title}</a>
                        </PostTitle>
                        <PostMeta>
                          <MetaItem>
                            <FaCalendarAlt /> {article.date}
                          </MetaItem>
                          <MetaItem>
                            <FaUser /> {article.author}
                          </MetaItem>
                          <MetaItem>
                            <FaTag /> {article.category}
                          </MetaItem>
                        </PostMeta>
                        <PostExcerpt>{article.excerpt}</PostExcerpt>
                        <ReadMoreButton to={article.url}>
                          Leggi di più
                        </ReadMoreButton>
                      </PostContent>
                    </BlogPost>
                  ))}
                </BlogGrid>
              </ErrorBoundary>
              <ErrorBoundary>
                <Pagination>
                  <PageButton active>1</PageButton>
                  <PageButton>2</PageButton>
                  <PageButton>3</PageButton>
                  <PageButton>→</PageButton>
                </Pagination>
              </ErrorBoundary>
            </BlogMain>

            <ErrorBoundary>
              <BlogSidebar>
                <SearchBox>
                  <SearchInput type="text" placeholder="Cerca nel blog..." />
                  <SearchButton>
                    <FaSearch />
                  </SearchButton>
                </SearchBox>

                <SidebarSection>
                  <SidebarTitle>Categorie</SidebarTitle>
                  <CategoryList>
                    <CategoryItem>
                      <a href="#risparmio">Risparmio Energetico (12)</a>
                    </CategoryItem>
                    <CategoryItem>
                      <a href="#rinnovabili">Energie Rinnovabili (8)</a>
                    </CategoryItem>
                    <CategoryItem>
                      <a href="#bollette">Guide alle Bollette (5)</a>
                    </CategoryItem>
                    <CategoryItem>
                      <a href="#tecnologia">Tecnologie Green (7)</a>
                    </CategoryItem>
                    <CategoryItem>
                      <a href="#news">News del Settore (10)</a>
                    </CategoryItem>
                  </CategoryList>
                </SidebarSection>

                <SidebarSection>
                  <SidebarTitle>Tag</SidebarTitle>
                  <TagsContainer>
                    <Tag href="#risparmio">Risparmio</Tag>
                    <Tag href="#energia">Energia</Tag>
                    <Tag href="#bollette">Bollette</Tag>
                    <Tag href="#rinnovabili">Rinnovabili</Tag>
                    <Tag href="#solare">Solare</Tag>
                    <Tag href="#eolico">Eolico</Tag>
                    <Tag href="#efficienza">Efficienza</Tag>
                    <Tag href="#casa">Casa</Tag>
                    <Tag href="#luce">Luce</Tag>
                    <Tag href="#gas">Gas</Tag>
                  </TagsContainer>
                </SidebarSection>

                <SidebarSection>
                  <SidebarTitle>Articoli Popolari</SidebarTitle>
                  <CategoryList>
                    <CategoryItem>
                      <a href="#popular1">
                        Come dimezzare la bolletta in estate
                      </a>
                    </CategoryItem>
                    <CategoryItem>
                      <a href="#popular2">
                        Pannelli solari: investimento o spesa?
                      </a>
                    </CategoryItem>
                    <CategoryItem>
                      <a href="#popular3">Guida ai bonus energia 2023</a>
                    </CategoryItem>
                    <CategoryItem>
                      <a href="#popular4">
                        Confronto delle migliori lampadine LED
                      </a>
                    </CategoryItem>
                  </CategoryList>
                </SidebarSection>
              </BlogSidebar>
            </ErrorBoundary>
          </BlogLayout>
        </ErrorBoundary>
      </PageContainer>
    </Layout>
  );
};

export default Blog;
