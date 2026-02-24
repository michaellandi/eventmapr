using EventMapr.Configuration;
using EventMapr.Hubs;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configuration file location can be overridden from environment variable (if mapping from DOCKER)
var configurationFile = Environment.GetEnvironmentVariable("EVENTMAPR_CONFIG_PATH");
if (!string.IsNullOrWhiteSpace(configurationFile))
{
    builder.Configuration.AddJsonFile(configurationFile);
}

builder.WebHost.UseUrls("http://0.0.0.0:5000");

builder.Services.AddControllers();

builder.Services.AddSignalR();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "EventMapr", Version = "v1" });
});

builder.Services.Configure<Settings>(builder.Configuration.GetSection("Settings"));

var app = builder.Build();

app.UseFileServer();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "EventMapr V1");
});

app.MapHub<MapHub>("/mapHub");
app.MapControllers();

app.Run();
