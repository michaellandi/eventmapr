using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;

namespace EventMapr
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            // Configuration file location can be overridden from environment variable (if mapping from DOCKER)
            var configurationFile = Environment.GetEnvironmentVariable("EVENTMAPR_CONFIG_PATH");
            if (string.IsNullOrWhiteSpace(configurationFile))
            {
                configurationFile = "appsettings.json";
            }

            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureAppConfiguration((config) =>
                {
                    config.AddJsonFile(configurationFile);
                });
        }
    }
}
