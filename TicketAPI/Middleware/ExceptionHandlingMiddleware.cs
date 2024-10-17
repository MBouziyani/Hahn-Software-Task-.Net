using Microsoft.AspNetCore.Http;
using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Text.Json;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;


    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;

    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        _logger.LogError(ex, "An unexpected error occurred."); // Log the exception

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var result = new
        {
            StatusCode = context.Response.StatusCode,
            Message = "Internal Server Error"
        };

        var jsonResponse = JsonSerializer.Serialize(result);

        return context.Response.WriteAsync(jsonResponse);
    }
}
