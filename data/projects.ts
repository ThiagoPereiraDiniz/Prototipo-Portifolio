// src/data/projects.ts

import { StaticImageData } from "next/image";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  hologramType: "arrakis-ui" | "thopter-patterns" | "bene-gesserit" | "tetris-game";
  image: StaticImageData;
  fullDescription: string;
}

// Caminho relativo para as imagens
import inscricaoImage from "../public/images/inscricao.png";
import previsaoVendasImage from "../public/images/previsao-vendas.png";
import calculadoraImage from "../public/images/calculadora.png";

export const projects: ProjectData[] = [
  {
    id: "inscricao",
    title: "Sistema de Inscrições",
    description: "Plataforma de inscrição simples e intuitiva, com formulários validados e foco em UX responsiva.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    link: "https://projeto-formulario-inscricao-trilhas.vercel.app/",
    githubLink: "https://github.com/ThiagoPereiraDiniz/Projeto-Formulario-Inscricao",
    hologramType: "arrakis-ui",
    fullDescription: `
      Relatório Detalhado e Explicado do Projeto

      1) Visão Geral
      O projeto é um sistema de inscrição online, com páginas HTML, CSS e JavaScript, e backend baseado em Node.js. O foco das melhorias foi tornar a aplicação mobile-first, garantindo que qualquer usuário consiga utilizar o sistema sem dificuldades.

      2) Estrutura do Projeto
      A estrutura principal ficou assim (explicando cada item):
      - .env: variáveis de ambiente (senhas, chaves, configs do servidor)
      - package.json: lista de dependências e scripts do Node.js
      - server.js: arquivo principal do servidor (backend em Node)
      - public/: arquivos acessados pelo usuário no navegador
        - index.html: página inicial
        - Login.html: página de login
        - dashboard.html: área interna do sistema (painel)
        - responsive.css: melhorias de estilo mobile-first (novo arquivo)

      3) Tecnologias Usadas
      - HTML: Estrutura da aplicação.
      - CSS: Design, cores, tamanhos, espaçamentos e responsividade.
      - JavaScript (JS): Interatividade e lógica no frontend.
      - JSON: Formato de dados usado para configuração.
      - Node.js: Ambiente que roda o backend.
      - Banco de Dados: O projeto utiliza MongoDB para gerenciar os dados.

      4) Melhorias de Responsividade
      As melhorias foram mobile-first. Detalhes técnicos:
      - Meta Viewport: \`<meta name="viewport" content="width=device-width, initial-scale=1">\` para ajuste automático da tela em celulares.
      - Criação do responsive.css: Uma “camada de ajustes” focada em telas pequenas, com tipografia fluida, layouts dinâmicos (.grid e .flex), formulários acessíveis e tabelas responsivas.
      - Acessibilidade: Criação de classes como \`.sr-only\` e botões maiores para telas de toque.

      5) Como Executar
      - Modo simples: Abra \`index.html\` no navegador.
      - Com servidor local: use \`node server.js\` ou \`python -m http.server 8080\`.
      - Acessar o site: Visite [https://projeto-formulario-inscricao-trilhas.vercel.app/](https://projeto-formulario-inscricao-trilhas.vercel.app/)

      6) Apresentação (Roteiro Sugerido)
      - Introdução (30s): Objetivo do projeto: um sistema de inscrição online que facilita o cadastro e o gerenciamento de usuários.
      - Demonstração prática (2 min)**: Mostre a responsividade no celular/emulador.
      - Parte técnica (2 min)**: Mostre o código do \`responsive.css\`, mencione o \`meta viewport\` e as tecnologias (**HTML, CSS, JS, Node.js e MongoDB**).
      - Encerramento (30s)**: Cite próximos passos.

      7) Checklist de Qualidade (QA)
      - ✅ Links e botões clicáveis facilmente no celular.
      - ✅ Imagens se ajustam ao tamanho da tela.
      - ✅ Formulários em largura total e sem zoom forçado.
      - ✅ Tabelas não quebram o layout.
      - ✅ Tipografia escalável.

      8) Próximos Passos (Evolução do Projeto)
      - Validação de formulários e máscaras de entrada.
      - Dark mode automático.
      - Adicionar animações suaves.
      - Teste com Lighthouse para performance e acessibilidade.
      - Integração com banco de dados real.
    `,
    image: inscricaoImage,
  },
  {
    id: "previsao-vendas",
    title: "Previsão de Vendas (Colab)",
    description: "Notebook em Google Colab para previsão de vendas com dados históricos e avaliação de modelos.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Google Colab", "Prophet"],
    hologramType: "thopter-patterns",
    fullDescription: `
      Relatório Detalhado do Projeto de Previsão de Vendas
      Este projeto teve como objetivo principal desenvolver um sistema automatizado para prever vendas de produtos congelados, calcular as quantidades ideais a serem retiradas do freezer diariamente, e gerar relatórios acionáveis para auxiliar no gerenciamento de estoque.

      Tecnologias, Bibliotecas e Linguagens Utilizadas:
      - Linguagem**: Python.
      - Bibliotecas Python:
        - pandas: Essencial para manipulação, análise e estruturação dos dados e relatórios.
        - prophet: Biblioteca da Meta (Facebook) para modelagem e previsão de séries temporais.
        - matplotlib e seaborn**: Para a visualização dos dados e criação de gráficos.
        - numpy: Usada para operações numéricas e arredondamentos.
        - holidays: Utilizada para identificar feriados nacionais do Brasil.
        - os e openpyxl: Para operações de sistema e para escrever relatórios em arquivos Excel.

      Componentes e Funcionalidades Desenvolvidas:
      - Cálculo de Retirada de Estoque**: Lógica para calcular a quantidade diária de retirada do freezer, considerando a demanda prevista, a perda de peso no descongelamento (15%) e o estoque existente. O cálculo final é ajustado para o número de freezers completos (18 kg cada).

      Análise de Sazonalidade e Impacto de Feriados/Fins de Semana:
      - Análise comparativa das vendas históricas e previstas em dias normais versus feriados/fins de semana para entender o impacto dessas datas.

      Considerações sobre Automação e Implementação:
      - O projeto inclui a discussão sobre a automação do pipeline completo de dados, desde a coleta até a geração de relatórios, usando ferramentas de agendamento (cron, agendadores em nuvem) para manter a precisão das previsões ao longo do tempo.

      Próximos Passos (Evolução do Projeto):
      - Integração com fontes de dados em tempo real (como inventário).
      - Refinamento contínuo da lógica de retirada.
      - Consideração de restrições operacionais (por exemplo, capacidade de transporte).
      - Construção de uma interface de usuário (UI) para facilitar a interação.
    `,
    image: previsaoVendasImage,
  },
  {
    id: "calculadora",
    title: "Calculadora Simples",
    description: "Calculadora web para operações básicas, com interface limpa e responsiva.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://calculadora-funcional-ten.vercel.app/",
    githubLink: "https://github.com/ThiagoPereiraDiniz/calculadora-Funcional",
    hologramType: "tetris-game",
    fullDescription: `
      Análise Técnica e Funcional da Calculadora Web
      1) Visão Geral
      Este projeto consiste em uma calculadora web minimalista e funcional, desenvolvida com o objetivo de demonstrar proficiência em fundamentos de desenvolvimento frontend. A aplicação oferece uma interface intuitiva para operações matemáticas básicas, garantindo uma experiência de usuário consistente e acessível em diferentes dispositivos.

      2) Tecnologias Utilizadas
      - HTML5: A base estrutural do projeto, definindo a interface de usuário (botões, display e layout). A semântica do HTML foi utilizada para garantir a acessibilidade e a organização clara do conteúdo.
      - CSS3: Responsável pela estilização e design. O uso de CSS puro (sem frameworks) demonstra o domínio sobre conceitos como layout flexbox e grid para criar uma interface limpa, moderna e responsiva. A aplicação foi projetada para se adaptar perfeitamente a telas de desktops, tablets e smartphones.
      - JavaScript (ES6+): O motor lógico da aplicação. Todo o processamento das operações matemáticas e a interação com a interface (manipulação do DOM) são gerenciados por JavaScript. Isso inclui a detecção de cliques nos botões, a atualização do display, a validação de entradas e a execução dos cálculos.

      3) Funcionalidades Chave
      - Operações Básicas: Suporte para adição, subtração, multiplicação e divisão.
      - Limpeza de Tela: Funcionalidade "C" para limpar o display e reiniciar o cálculo.
      - Responsividade: O layout se ajusta dinamicamente a diferentes tamanhos de tela, garantindo usabilidade em qualquer dispositivo sem a necessidade de zoom.

      4) Aprendizados e Demonstração de Habilidades
      O desenvolvimento deste projeto foi uma oportunidade para reforçar conceitos essenciais de desenvolvimento web, incluindo:
      - Estrutura de Código Limpa**: Organização do HTML e CSS.
      - Manipulação do DOM**: Gerenciamento de eventos e atualização de elementos da página.
      - Lógica de Programação: Implementação de uma lógica funcional para processar expressões matemáticas.
      - Design Responsivo: Aplicação de técnicas de CSS para garantir uma interface adaptável.

      5) Próximos Passos (Evolução do Projeto)
      - Funcionalidades Avançadas**: Adicionar operações como porcentagem, raiz quadrada e memória.
      - Design: Implementar um modo escuro (dark mode).
      - Testes: Escrever testes unitários para a lógica JavaScript para garantir a robustez do código.
    `,
    image: calculadoraImage,
  },
];