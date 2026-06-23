# Estrutura do Banco de Dados (CRM Jurídico)

Com base no código da sua aplicação Front-end, o sistema possui duas entidades principais: **Processos** e **Prazos** (Agenda). 

Seja usando um banco de dados relacional (como PostgreSQL ou MySQL) ou NoSQL (como MongoDB ou Firebase Firestore), a estrutura de dados necessária para suportar todas as funcionalidades do sistema é a seguinte:

## 1. Tabela / Coleção: `processos`
Esta entidade armazena todas as informações do cliente, dados do processo e informações financeiras em um único documento/registro.

> [!NOTE]
> Em bancos SQL, você pode achatar os objetos (`dadosPessoais_nomeCompleto`) ou criar tabelas auxiliares (ex: `clientes`, `processos`, `financeiro`). Em bancos NoSQL (como Firebase), você pode usar exatamente a estrutura aninhada abaixo.

### Esquema:
- `id` (String / UUID) - **Chave Primária**
- `fase` (Inteiro) - *Identifica em qual fase o processo está (1 a 5).*

**Objeto: `dadosPessoais`**
- `nomeCompleto` (String / VARCHAR)
- `cpfCnpj` (String / VARCHAR)
- `rg` (String / VARCHAR)
- `dataNascimento` (Date / String YYYY-MM-DD)
- `profissao` (String / VARCHAR)
- `numeroProcesso` (String / VARCHAR)
- `varaComarca` (String / VARCHAR)
- `tipoAcao` (String / VARCHAR) - *Ex: Trabalhista, Cível, Criminal*
- `advogadoResponsavel` (String / VARCHAR)
- `dataAbertura` (Date / String YYYY-MM-DD)

**Objeto: `contato`**
- `telefonePrincipal` (String / VARCHAR)
- `whatsapp` (String / VARCHAR)
- `email` (String / VARCHAR)
- `rua` (String / VARCHAR)
- `numero` (String / VARCHAR)
- `bairro` (String / VARCHAR)
- `cidade` (String / VARCHAR)
- `cep` (String / VARCHAR)
- `contatoEmergenciaNome` (String / VARCHAR)
- `contatoEmergenciaTelefone` (String / VARCHAR)

**Objeto: `financeiro`**
- `honorarios` (Decimal / Float)
- `formaPagamento` (String / VARCHAR) - *Ex: Parcelado, À Vista, Êxito*
- `parcelas` (Inteiro)
- `valorParcela` (Decimal / Float)
- `valorRecebido` (Decimal / Float)
- `valorAberto` (Decimal / Float)
- `observacoes` (Texto / TEXT) - *Comentários adicionais sobre o pagamento*

---

## 2. Tabela / Coleção: `prazos`
Esta entidade gerencia a agenda e os prazos. Ela possui uma relação (Chave Estrangeira) com a tabela de Processos.

### Esquema:
- `id` (String / UUID) - **Chave Primária**
- `processoId` (String / UUID) - **Chave Estrangeira** *(Referência ao ID do Processo correspondente)*
- `titulo` (String / VARCHAR) - *Ex: "Audiência de Instrução e Julgamento"*
- `data` (Date / String YYYY-MM-DD)
- `hora` (Time / String HH:MM)
- `tipo` (String / VARCHAR) - *Ex: Audiência, Prazo Processual, Reunião, Perícia*
- `status` (String / VARCHAR) - *Ex: "Pendente" ou "Concluído"*

---

## Recomendações de Banco de Dados

> [!TIP]
> **Qual banco escolher?**
> 
> 1. **Firebase Firestore / Supabase**: Como você já está usando React/Vite e a estrutura atual do front-end usa objetos JSON aninhados (`dadosPessoais`, `contato`, `financeiro`), o **Firebase (NoSQL)** ou **Supabase (PostgreSQL com suporte a JSON)** seriam as integrações mais fáceis e rápidas de implementar.
> 
> 2. **PostgreSQL / MySQL (SQL Tradicional)**: Se optar por relacional puro, recomenda-se criar uma tabela `clientes` e uma tabela `processos` separadas, onde o processo pertence a um cliente, evitando assim repetir os dados de contato caso um mesmo cliente tenha múltiplos processos.
