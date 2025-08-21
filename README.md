# Dashboard de Monitoramento – Front-End

Este projeto faz parte da disciplina **Projeto Integrador 4** da **UNIVESP**.  

Este repositório contém o **front-end do sistema de monitoramento de bancadas eletrônicas**, desenvolvido em **React** com **Material UI (MUI)**. O objetivo é criar uma **plataforma que permite visualizar em tempo real condições como temperatura, umidade, luminosidade, ruído e outros parâmetros relevantes para a engenharia de bancada**.

O objetivo deste README é explicar **as tecnologias utilizadas**, **para que serve cada dependência instalada** e como configurar o projeto.

---

## 1️⃣ Tecnologias utilizadas

- **React**: biblioteca para criar interfaces de usuário.  
- **Vite**: ferramenta para criar e rodar o projeto de forma rápida.  
- **TypeScript**: linguagem que adiciona tipagem ao JavaScript.  
- **Material UI (MUI)**: biblioteca de componentes prontos do Material Design.  

---

## 2️⃣ Dependências principais

| Dependência | Para que serve |
|------------|----------------|
| `@mui/material` | Componentes prontos (botões, cards, sliders, etc.) do Material Design. |
| `@emotion/react` e `@emotion/styled` | Motor de estilos do MUI, necessário para aplicar temas e estilos nos componentes. |
| `@mui/icons-material` | Ícones prontos do Material Design para usar nos componentes. |
| `@mui/lab` | Componentes experimentais do MUI, como Timeline, DatePicker e Rating (opcional). |

---

## 3️⃣ Como instalar

1. Instale as dependências do projeto:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev   # Para Vite
# ou
npm start     # Para Create React App
```

O aplicativo será aberto em http://localhost:3000.

## 4️⃣ Estrutura básica do projeto
```bash

src/
├─ App.jsx          # Componente principal
├─ index.js         # Ponto de entrada
├─ components/      # Componentes reutilizáveis (cards, botões)
├─ pages/           # Páginas do app (Home, Bancadas, Configurações)
└─ assets/          # Imagens e arquivos estáticos
```