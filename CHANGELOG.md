# Changelog

## 2026-02-25 — .NET 8.0 Upgrade

**Author:** Automated dependency upgrade

### Framework Upgrade
- Upgraded target framework from .NET Core 2.1 (`netcoreapp2.1`) to .NET 8.0 (`net8.0`)
- Added `<Nullable>enable</Nullable>` and `<ImplicitUsings>enable</ImplicitUsings>` to project properties
- Removed obsolete `<TypeScriptToolsVersion>` property

### NuGet Package Updates
- **Swashbuckle.AspNetCore**: 4.0.1 → 6.9.0
- **Microsoft.VisualStudio.Web.CodeGeneration.Design**: 2.1.1 → 8.0.7

### Removed Obsolete Packages
- **Microsoft.AspNetCore.App** metapackage (included implicitly in .NET 8.0 SDK)
- **Microsoft.AspNetCore.Razor.Design** (included in .NET 8.0 SDK)

### Code Migrations
- **Swashbuckle**: Replaced `Swashbuckle.AspNetCore.Swagger.Info` with `Microsoft.OpenApi.Models.OpenApiInfo`
- **JSON Serialization**: Replaced `Newtonsoft.Json` with `System.Text.Json` in `ConfigurationController`
  - `JsonSerializerSettings` / `CamelCasePropertyNamesContractResolver` → `JsonSerializerOptions` / `JsonNamingPolicy.CamelCase`
- **Hosting**: Replaced `WebHost.CreateDefaultBuilder` with `Host.CreateDefaultBuilder` / `ConfigureWebHostDefaults` pattern in `Program.cs`
- **Routing**: Replaced `app.UseSignalR()` and `app.UseMvc()` with endpoint routing (`app.UseRouting()` + `app.UseEndpoints()`)
- **MVC**: Replaced `services.AddMvc().SetCompatibilityVersion()` with `services.AddControllersWithViews()`
- **Environment**: Replaced `IHostingEnvironment` with `IWebHostEnvironment` in `Startup.Configure`
