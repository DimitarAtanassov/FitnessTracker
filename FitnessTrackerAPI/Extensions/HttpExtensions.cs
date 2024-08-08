using FitnessTrackerAPI.Helpers;
using System.Text.Json;

namespace FitnessTrackerAPI.Extensions
{
    public static class HttpExtensions
    {
        
        public static void AddPaginationHeader<T>(this HttpResponse response, PaginatedList<T> data)
        {
            var paginationHeader = new PaginationHeader(data.PageIndex, data.PageSize, data.TotalCount, data.TotalPages);

            /*
            Even though we will be using this inside of our user controller, it will be outside of the scope of the API controller,
            therefore we can't really on the BaseApiController to seralize the data in camel case. But we want our response to be in json and camel case so we specify it here.  
            */
            var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            // At this point we have appened our pagination header to the JSON response, but client will not have access to this header.
            // We need to add a CORS header to allow the client to access this header
            response.Headers.Append("Pagination", JsonSerializer.Serialize(paginationHeader, jsonOptions));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
