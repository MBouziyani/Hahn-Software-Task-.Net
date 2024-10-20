USE [TicketDB]
GO
/****** Object:  User [TicketDB]    Script Date: 10/18/2024 12:20:49 AM ******/
CREATE USER [TicketDB] FOR LOGIN [TicketDB] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [TicketUser]    Script Date: 10/18/2024 12:20:49 AM ******/
CREATE USER [TicketUser] FOR LOGIN [TicketUser] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [TicketDB]
GO
ALTER ROLE [db_owner] ADD MEMBER [TicketUser]
GO
ALTER ROLE [db_datareader] ADD MEMBER [TicketUser]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [TicketUser]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 10/18/2024 12:20:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tickets]    Script Date: 10/18/2024 12:20:49 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tickets](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Status] [int] NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Tickets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
