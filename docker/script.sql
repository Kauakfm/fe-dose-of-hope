CREATE DATABASE bancoDoseEsperanca
GO
USE [bancoDoseEsperanca]
GO

/****** Object:  Table [dbo].[tabUsuario]    Script Date: 04/11/2023 19:51:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tabUsuario](
	[codigo] [int] IDENTITY(1,1) NOT NULL,
	[nome] [varchar](100) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[senha] [varchar](100) NOT NULL,
	[rg] [varchar](100) NOT NULL,
	[cpf] [varchar](100) NOT NULL,
	[generoCodigo] [int] NULL,
	[tipoUsuarioCodigo] [int] NOT NULL,
	[ultimoAcesso] [datetime] NULL,
	[dataCriacao] [datetime] NULL,
	[dataNascimento] [date] NULL,
	[cep] [varchar](100) NULL,
	[rua] [varchar](100) NULL,
	[bairro] [varchar](100) NULL,
	[cidade] [varchar](100) NULL,
	[uf] [int] NULL,
	[numeroResidencia] [varchar](10) NULL,
	[complemento] [varchar](100) NULL,
	[dataEmailEnviado] [datetime] NULL,
	[unidadeCodigo] [int] NULL,
	[telefone] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tabGenero]    Script Date: 04/11/2023 19:51:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tabGenero](
	[codigo] [int] NOT NULL,
	[descricao] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tabUnidade]    Script Date: 04/11/2023 19:51:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tabUnidade](
	[codigo] [int] NOT NULL,
	[descricao] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tabTipoUsuario]    Script Date: 04/11/2023 19:52:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tabTipoUsuario](
	[codigo] [int] NOT NULL,
	[descricao] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[codigo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT INTO tabTipoUsuario (codigo, descricao)
VALUES
(1, 'Administrador'),
(2, 'Usuário Comum');
GO
INSERT INTO tabUnidade (codigo, descricao)
VALUES
(1, 'Unidade A'),
(2, 'Unidade B'),
(3, 'Unidade C');
GO
INSERT INTO tabGenero (codigo, descricao)
VALUES
(1, 'Masculino'),
(2, 'Feminino'),
(3, 'Outro');
GO
INSERT INTO tabUsuario (nome, email, senha, rg, cpf, generoCodigo, tipoUsuarioCodigo, ultimoAcesso, dataCriacao, dataNascimento, cep, rua, bairro, cidade, uf, numeroResidencia, complemento, dataEmailEnviado, unidadeCodigo, telefone)
VALUES
('adsdasd', 'kaua.kfm@icloud.com', '123', '123123123', '56025888842', 1, 2, '2023-11-04 19:00:02.413', '2023-11-04 18:08:39.703', '2006-09-23', '06406120', 'Rua Antônio Carlos', 'Vila Ceres', 'Barueri', 25, '131', 'casa', '2023-11-04 18:08:39.700', 1, '12312312312'),
('Kaua Ferreira Martins', 'kaua.kfm@icloud.com', 'Var@1234', '123456789', '56025888842', 1, 2, NULL, '2023-11-04 19:04:54.437', '2000-09-23', '06406120', 'Rua Antônio Carlos', 'Vila Ceres', 'Barueri', 25, '131', 'casa', '2023-11-04 19:04:54.423', 1, '(11)94016-5069'),
('Kaua Ferreira Marins', 'kaua.kfm@icloud.com', 'Var@12345678', '123456789', '56025888842', 1, 2, NULL, '2023-11-04 19:15:00.980', '2000-09-23', '06406120', 'Rua Antônio Carlos', 'Vila Ceres', 'Barueri', 25, '131', 'casa', '2023-11-04 19:15:00.980', 1, '(11)94016-5069'),
('Kauã ferreira martins', 'kaua.kfm@icloud.com', '1234', '123456789', '56025888842', 1, 2, NULL, '2023-11-04 19:22:02.200', '2000-09-23', '06406120', 'Rua Antônio Carlos', 'Vila Ceres', 'Barueri', 25, '131', 'casa', '2023-11-04 19:22:02.200', 1, '(11)94016-5069'),
('Matheus Pimentel', '1matheuspimentel@gmail.com', 'lasanha157', '524444055', '40806541890', 2, 2, NULL, '2023-11-04 19:26:22.723', '2006-12-20', '06449160', 'Rua Cerejeira', 'Parque Viana', 'Barueri', 25, '186', 'muquifo', '2023-11-04 19:26:22.723', 1, '(11)97795-6356');
GO
