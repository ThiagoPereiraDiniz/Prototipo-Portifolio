import { StaticImageData } from "next/image";
import inscricaoImage from "../public/images/inscricao.png";
import previsaoVendasImage from "../public/images/previsao-vendas.png";
import calculadoraImage from "../public/images/calculadora.png";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  hologramType: "arrakis-ui" | "thopter-patterns" | "bene-gesserit" | "tetris-game";
  image: StaticImageData; // Propriedade adicionada
}

export const projects: ProjectData[] = [
  {
    id: "inscricao",
    title: "Sistema de Inscrições",
    description:
      "Plataforma de inscrição simples e intuitiva, com formulários validados e foco em UX responsiva.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "/projects/inscricao",
    hologramType: "arrakis-ui",
    image: inscricaoImage, // Imagem importada
  },
  {
    id: "previsao-vendas",
    title: "Previsão de Vendas (Colab)",
    description:
      "Notebook em Google Colab para previsão de vendas com dados históricos e avaliação de modelos.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Google Colab"],
    link: "/projects/previsao-vendas",
    hologramType: "thopter-patterns",
    image: previsaoVendasImage, // Imagem importada
  },
  {
    id: "calculadora",
    title: "Calculadora Simples",
    description:
      "Calculadora web para operações básicas, com interface limpa e responsiva.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "/projects/calculadora",
    hologramType: "tetris-game",
    image: calculadoraImage, // Imagem importada
  },
];