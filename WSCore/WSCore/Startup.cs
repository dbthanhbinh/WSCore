using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WSCore.Infrastructure.Repository;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Models;
using WSCore.Services.ArticleService;
using WSCore.Services.CategoryService;
using WSCore.Services.MediaService;
using WSCore.Services.ObjectTagService;
using WSCore.Services.SeoService;
using WSCore.Services.TagService;
using WSCore.Services.UploadService;
using WSCore.Services.UserService;

namespace WSCore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllCors",
                    builder =>
                    {
                        builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
            });

            services.AddControllersWithViews();

            string ConnectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<WSContext>(options =>
            options.UseSqlServer(ConnectionString));

            services.AddScoped(typeof(IRepository<>), typeof(Repository<,>));
            services.AddScoped<IUnitOfWork, UnitOfWork<WSContext>>();

            services.AddScoped<ITagService, TagService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IObjectTagService, ObjectTagService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUploadService, UploadService>();
            services.AddScoped<IMediaService, MediaService>();
            services.AddScoped<IArticleService, ArticleService>();
            services.AddScoped<ISeoService, SeoService>();
            
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors("AllowAllCors");
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
