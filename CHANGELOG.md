# Changelog

## [Unreleased] - 2025-02-24

### Changed
- Upgraded target framework from .NET Core 2.1 to .NET 8.0 LTS
- Migrated from Startup.cs pattern to minimal hosting model in Program.cs
- Updated Swashbuckle.AspNetCore from 4.0.1 to 6.5.0
- Replaced deprecated `Microsoft.AspNetCore.App` metapackage with SDK-provided framework
- Removed `Microsoft.AspNetCore.Razor.Design` and `Microsoft.VisualStudio.Web.CodeGeneration.Design` packages (no longer needed)
- Migrated from `IHostingEnvironment` to `IWebHostEnvironment`
- Migrated from `UseSignalR()`/`UseMvc()` to endpoint routing (`MapHub`, `MapControllers`)
- Replaced Newtonsoft.Json usage in ConfigurationController with System.Text.Json (default in .NET 8)
- Updated Swagger configuration from `Info` to `OpenApiInfo`
- Updated SignalR client library reference from `@aspnet/signalr@1.0.3` to `@microsoft/signalr@8.0.0`
- Updated Dockerfile base images from `microsoft/dotnet` to `mcr.microsoft.com/dotnet/sdk:8.0` and `mcr.microsoft.com/dotnet/aspnet:8.0`
- Updated solution file Visual Studio version references
- Updated README.md to reference .NET 8.0 SDK

*Changes made by Kiro*
