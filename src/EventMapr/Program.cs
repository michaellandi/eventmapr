using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;

namespace EventMapr
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var configurationFile = Environment.GetEnvironmentVariable("EVENTMAPR_CONFIG_PATH");
            if (string.IsNullOrWhiteSpace(configurationFile))
            {
                configurationFile = "appsettings.json";
            }

            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseUrls("http://0.0.0.0:5000");
                    webBuilder.ConfigureAppConfiguration((context, config) =>
                    {
                        config.AddJsonFile(configurationFile);
                    });
                });
        }
    }
}
