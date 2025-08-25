# 📄 Software Design Description (SDD) — DespacheJá

**Versão:** 0.1  
**Autor:** Cristhian Eduardo  
**Data:** 25/08/2025  
**Organização:** Em criação entre amigos programadores  
**Status:** Rascunho Inicial

---

## 📌 Histórico de Versões

| Versão | Data       | Autor             | Descrição                          |
|--------|-----------|------------------|------------------------------------|
| 0.1    | 25/08/2025 | Cristhian Eduardo | Criação inicial do documento (contexto completo) |
| 0.2    | TODO       | TODO             | Inclusão de diagramas e modelagem de dados |
| 1.0    | TODO       | TODO             | Primeira versão estável do SDD |

---

## 📑 Índice

1. [Introdução](#1-introdução)  
   1.1 [Propósito](#11-propósito)  
   1.2 [Escopo do Sistema](#12-escopo-do-sistema)  
   1.3 [Público-Alvo](#13-público-alvo)  
   1.4 [Problemas Identificados](#14-problemas-identificados)  
   1.5 [Benefícios do Sistema](#15-benefícios-do-sistema)  
   1.6 [Referências](#16-referências)  
   1.7 [Glossário](#17-glossário)  

2. [Visão Geral da Arquitetura](#2-visão-geral-da-arquitetura)  
   2.1 [Frontend](#21-frontend)  
   2.2 [Backend](#22-backend)  
   2.3 [Banco de Dados](#23-banco-de-dados)  
   2.4 [Integrações Futuras](#24-integrações-futuras)  
   2.5 [Roles e Permissões](#25-roles-e-permissões)  

3. [Módulos Funcionais](#3-módulos-funcionais)  
   3.1 [Gestão de Serviços](#31-gestão-de-serviços)  
       3.1.1 [Serviços Complexos](#311-serviços-complexos)  
       3.1.2 [Serviços Simples](#312-serviços-simples)  
   3.2 [Histórico](#32-histórico)  
   3.3 [Financeiro](#33-financeiro)  
   3.4 [Clientes](#34-clientes)  
   3.5 [Despachante](#35-despachante)  
   3.6 [Configurações e Parâmetros](#36-configurações-e-parâmetros)  
   3.7 [Planos](#37-planos)  
   3.8 [Notificações](#38-notificações)  

4. [Requisitos Não Funcionais](#4-requisitos-não-funcionais)  
5. [Modelagem de Dados](#5-modelagem-de-dados)  
6. [Pendências e Próximos Passos](#6-pendências-e-próximos-passos)  

---

## 1. Introdução

### 1.1 Propósito
Este documento descreve o **DespacheJá**, um sistema SaaS de gestão e automação para despachantes documentalistas veiculares.  
O objetivo é digitalizar e automatizar os processos de serviços simples e complexos, reduzir erros, controlar histórico, e oferecer visão financeira completa para o despachante.

---

### 1.2 Escopo do Sistema
- Gestão de **serviços veiculares** (simples e complexos).  
- Histórico completo de serviços complexos, com fluxo de etapas detalhado.  
- Pagamentos vinculados a serviços ou avulsos, incluindo status (parcial, total, pendente).  
- Gestão de despesas agrupadas (insumos, papelaria, combustíveis, água, luz).  
- Diferenciação de funcionalidades via **planos de assinatura**.  
- Configurações por despachante (ativar/desativar funções, parâmetros de documentos e taxas).  
- Notificações via WhatsApp para clientes e despachantes (MVP).  

---

### 1.3 Público-Alvo
- **Despachantes documentalistas:** MEIs ou pequenas empresas (até 4 funcionários).  
- **Clientes indiretos:** acesso via links públicos para acompanhar serviços prestados.  

---

### 1.4 Problemas Identificados
- Preenchimento manual de formulários do DETRAN (10-15 minutos cada).  
- Falta de histórico de serviços e financeiro unificado.  
- Gestão via planilhas Excel, com baixo nível de automatização.  
- Múltiplos documentos simultâneos, dificultando controle e rastreabilidade.  

---

### 1.5 Benefícios do Sistema
- Redução do tempo de preenchimento de formulários.  
- Histórico detalhado por serviço, permitindo acompanhamento completo.  
- Transparência e controle financeiro, com relatórios consolidados.  
- Automatização de notificações e processos repetitivos.  
- Escalabilidade para múltiplos estados, parametrizável por localidade.  

---

### 1.6 Referências
- DETRAN-MG e legislações relacionadas  
- Firebase Authentication  
- PostgreSQL e boas práticas de modelagem de dados  
- APIs de integração com WhatsApp  

---

### 1.7 Glossário
- **Serviço Simples:** Processo rápido, sem workflow complexo.  
- **Serviço Complexo:** Processo com múltiplas etapas, workflow e histórico detalhado.  
- **Cliente Indireto:** Usuário que acompanha serviço via link público.  
- **Despachante:** Usuário principal do sistema, responsável pela gestão e execução de serviços.  
- **Plano de Assinatura:** Nível de funcionalidades habilitadas no sistema.  

---

## 2. Visão Geral da Arquitetura

### 2.1 Frontend
- **Framework:** Next.js 15.3.5  
- **Linguagem:** TypeScript  
- **UI:** Material UI + Tailwind CSS  
- **Hospedagem:** Vercel  
- **Funcionalidades principais:**  
  - Login via Firebase Auth, validação de tokens no backend  
  - Dashboard do despachante (serviços, histórico, financeiro, clientes)  
  - Cadastro e gerenciamento de serviços, clientes, veículos  
  - Visualização de histórico e status do serviço  
  - Combos de serviços simples com descontos  

---

### 2.2 Backend
- **Framework:** NestJS (arquitetura modular)  
- **Linguagem:** TypeScript  
- **Hospedagem:** Railway  
- **Módulos planejados:**  
  - Auth (Firebase token validation)  
  - Users (despachantes e funcionários)  
  - Clients  
  - Vehicles  
  - Services (Simples e Complexos)  
  - Finance (Pagamentos e Despesas)  
  - Plans  
  - Notifications (WhatsApp MVP)  
  - Settings/Parameters  

> **TODO:** detalhar cada módulo com endpoints, payloads e regras de negócio

---

### 2.3 Banco de Dados
- **SGBD:** PostgreSQL  
- **UUID** como padrão para todas as tabelas  
- **Soft delete/update** (`deleted_at`, `updated_at`)  
- Tabelas principais: despachantes, usuários, clientes, veículos, serviços simples, serviços complexos, histórico de serviços complexos, despesas, pagamentos, planos, cidades/circunscrição, parâmetros de documentos.

> **TODO:** criar diagrama ER detalhado

---

### 2.4 Integrações Futuras
- **OCR:** leitura automática de documentos (pós-MVP)  
- **WhatsApp API:** envio de notificações automáticas (MVP)  
- **N8n:** automação de processos (futuro)  
- **Autofill DETRAN:** execução front-end (futuro)  

---

### 2.5 Roles e Permissões
- **OWNER:** acesso completo ao sistema e financeiro  
- **EMPLOYEE:** cadastro de serviços, clientes e veículos, sem alterar valores do despachante  
- **ADMIN SYSTEM (futuro):** configuração global de planos, valores e integrações  

---

## 3. Módulos Funcionais

### 3.1 Gestão de Serviços

#### 3.1.1 Serviços Complexos
- Workflow detalhado com status:  
  `INITIAL → FORM_FILLED → FEE_PAID → INSPECTION_SCHEDULED → INSPECTION_DONE → REINSPECTION_REQUIRED → SUBMITTED → DOCUMENT_PENDING → PLATE_PENDING → COMPLETED`  
- Histórico por etapa vinculado ao serviço e cliente  
- Controle de proprietário antigo e novo, quando aplicável  
- Taxas e valores configuráveis por despachante

``` mermaid
sequenceDiagram
    autonumber

    participant C as 👤 Cliente
    participant S as 🖥️ Sistema SDT
    participant D as 🏛️ Detran/UAI/Delegacia

    %% ---- Pré-vistoria ----
    note over C,S: 📝 Pré-vistoria
    C->>S: Preencher formulário
    S->>C: ✅ Formulário preenchido (FORM_FILLED)
    C->>S: 💰 Pagar taxa
    S->>C: ✅ Pagamento confirmado (FEE_PAID)

    %% ---- Vistoria ----
    note over C,S: 🔧 Vistoria
    S->>C: Agendar vistoria (INSPECTION_SCHEDULED)
    C->>S: Comparecer na vistoria
    S->>C: ✅ Vistoria realizada (INSPECTION_DONE)
    
    loop 🔄 Reagendamento se necessário
        C->>S: Solicitar reagendamento
        S->>C: 🔄 Vistoria reagendada (REINSPECTION_REQUIRED)
        C->>S: Comparecer na vistoria
        S->>C: ✅ Vistoria realizada (INSPECTION_DONE)
    end

    %% ---- Documentos ----
    note over S,D: 📦 Submissão de documentos
    S->>D: Submeter documentos (SUBMITTED)
    D->>S: Documento processado (DOCUMENT_PENDING)
    
    loop 🔄 Correção de documento
        D->>S: Solicitar correção
        S->>D: Reenvio de documentos
        D->>S: Documento processado (DOCUMENT_PENDING)
    end

    %% ---- Placa / Conclusão ----
    note over S,D: 🏷️ Placa / Conclusão
    alt Pedido de placa
        S->>D: Solicitar placa (PLATE_PENDING)
        D->>S: Placa emitida
    end

    S->>C: ✅ Processo concluído (COMPLETED)

    %% ---- Pagamento / Entrega ----
    note over C,S: 💳 Pagamento / Entrega
    alt Pagamento pendente
        C->>S: Efetuar pagamento (AWAITING_PAYMENT)
        S->>C: ✅ Pagamento confirmado
    end
    S->>C: 📄 Documento entregue (DELIVERED)

```

``` mermaid
flowchart TD
    %% --------------------
    %% Fase 1: Pré-vistoria
    %% --------------------
    INITIAL[📝 INITIAL: Criar processo] --> FORM_FILLED[📝 FORM_FILLED: Formulário preenchido]
    FORM_FILLED --> FEE_PAID[💰 FEE_PAID: Taxa paga]

    %% --------------------
    %% Fase 2: Vistoria
    %% --------------------
    FEE_PAID --> INSPECTION_SCHEDULED[🔧 INSPECTION_SCHEDULED: Vistoria agendada]
    INSPECTION_SCHEDULED --> INSPECTION_DONE[🔧 INSPECTION_DONE: Vistoria realizada]

    %% Loop de reagendamento de vistoria
    INSPECTION_DONE --> REINSPECTION_REQUIRED[🔄 REINSPECTION_REQUIRED: Reagendar vistoria]
    REINSPECTION_REQUIRED --> INSPECTION_DONE

    %% --------------------
    %% Fase 3: Documentos / Submissão
    %% --------------------
    INSPECTION_DONE --> SUBMITTED[📦 SUBMITTED: Entrar com documentos na UAI/Delegacia]
    SUBMITTED --> DOCUMENT_PENDING[📦 DOCUMENT_PENDING: Documento processado]

    %% Loop de correção de documento apenas se houver erro
    DOCUMENT_PENDING -->|Erro detectado| SUBMITTED

    %% --------------------
    %% Fase 4: Placa / Conclusão
    %% --------------------
    DOCUMENT_PENDING -->|Pedido de placa necessário| PLATE_PENDING[🏷️ PLATE_PENDING: Pedido de placa]
    DOCUMENT_PENDING -->|Sem placa| COMPLETED[✅ COMPLETED: Concluído]

    PLATE_PENDING --> COMPLETED

    %% --------------------
    %% Fase 5: Pagamento / Entrega
    %% --------------------
    COMPLETED -->|Pagamento pendente| AWAITING_PAYMENT[💳 AWAITING_PAYMENT: Se pagamento pendente]
    AWAITING_PAYMENT --> DELIVERED[📄 DELIVERED: Documento entregue]
    COMPLETED -->|Pagamento já realizado| DELIVERED

```

#### 3.1.2 Serviços Simples
- Cadastro rápido  
- Combos de serviços com descontos automáticos  
- Histórico básico, apenas para registro do serviço  

### 3.2 Histórico
- Armazenamento por serviço  
- Permite rastrear status, datas, pagamentos e documentos  

### 3.3 Financeiro
- **Pagamentos:** vinculados a serviços simples ou complexos, ou avulsos  
- **Status:** UNPAID, PARTIAL, FULL  
- **Despesas:** categorizadas (água, luz, combustíveis, papelaria)  
- Relatórios consolidados para despachante  

### 3.4 Clientes
- Cadastro com nome e telefone obrigatório  
- CPF/CNPJ e endereço opcionais  
- Visualização de quantidade de serviços prestados e histórico resumido  

### 3.5 Despachante
- Cadastro completo: endereço, telefone, parâmetros, plano  
- Configuração de habilitação/desabilitação de funções  

### 3.6 Configurações e Parâmetros
- Valores default para serviços  
- Checklist de documentos parametrizável por cidade/estado  
- Controle de funcionalidades habilitadas por plano  

### 3.7 Planos
- Diferencia funcionalidades disponíveis  
- Níveis: BASIC, AUTOMATION, PREMIUM  
- Afeta apenas o que o despachante pode acessar, não os clientes  

### 3.8 Notificações
- Envio de alertas para clientes e despachantes via WhatsApp  
- MVP: envio básico  
- Futuro: integração completa com fluxo de processos e n8n  

---

## 4. Requisitos Não Funcionais
- Segurança: autenticação Firebase, HTTPS, validação de tokens  
- Escalabilidade: modular, preparado para microsserviços  
- Performance: otimização para dashboards e consultas rápidas  
- Usabilidade: interface em português, clara e acessível  
- Disponibilidade: hospedagem na Vercel (frontend) e Railway (backend)  

---

## 5. Modelagem de Dados
- **Tabelas principais:** Despachantes, Usuários, Clientes, Veículos, Serviços Simples, Serviços Complexos, Histórico, Pagamentos, Despesas, Planos, Cidades/Circunscrição, Parâmetros  
- **Relacionamentos:**  
  - Um despachante tem múltiplos usuários  
  - Um serviço pertence a um despachante e a um cliente  
  - Histórico vinculado a serviço complexo  
  - Pagamentos vinculados a serviços ou avulsos  
  - Despesas podem ser gerais ou vinculadas a serviços  

> **TODO:** Diagrama ER completo  

---

## 6. Pendências e Próximos Passos
- Inserir diagramas detalhados (arquitetura e banco)  
- Criar documentação de endpoints do backend  
- Refinar fluxos de serviços e notificações  
- Detalhar integrações futuras (n8n, DETRAN Autofill)  
- Validar requisitos não funcionais antes do MVP  

