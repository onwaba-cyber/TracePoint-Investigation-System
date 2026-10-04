using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Controllers + JSON (camelCase by default). IgnoreCycles protects us if Person 2 adds navigation properties.
builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// EF Core. Provider must match what Person 2 chose (SqlServer shown here; SQLite -> UseSqlite).
builder.Services.AddDbContext<TracePointContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS: lets the React dev server call this API from the browser.
const string ReactPolicy = "ReactClient";
builder.Services.AddCors(options =>
    options.AddPolicy(ReactPolicy, policy =>
        policy.WithOrigins("http://localhost:5173",   // Vite default
                           "http://localhost:3000")   // Create React App default
              .AllowAnyHeader()
              .AllowAnyMethod()));

// Optional Swagger (dotnet add package Swashbuckle.AspNetCore), then uncomment:
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

var app = builder.Build();

// if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }

app.UseHttpsRedirection();
app.UseCors(ReactPolicy);   // must come before MapControllers
app.UseAuthorization();
app.MapControllers();

app.Run();

// Makes Program visible to Person 6's integration tests (WebApplicationFactory<Program>).
public partial class Program { }
