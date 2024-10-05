using Microsoft.EntityFrameworkCore;

namespace radio_api.Results
{
    public class PaginationResult<T>
    {

        public int Page { get; set; }
        public int TotalItemsCount { get; set; }
        public int TotalPages { get; init; }
        public List<T> Results { get; set; }
        public bool HasNextPage => Page * 10 < TotalItemsCount;
        public bool HasPreviousPage => Page > 1;

        public PaginationResult(List<T> results, int page, int totalItemsCount, int totalPages)
        {
            Page = page;
            TotalItemsCount = totalItemsCount;
            Results = results;
            TotalPages = totalPages;
        }

        public static async Task<PaginationResult<T>> CreateAsync(IQueryable<T> query, int page)
        {
            int resultsPerPage = 10;
            int totalItemsCount = await query.CountAsync();
            var results = await query.Skip((page - 1) * resultsPerPage).Take(resultsPerPage).ToListAsync();
            int totalPages = (int)Math.Ceiling((decimal)totalItemsCount / resultsPerPage);

            return new(results, page, totalItemsCount, totalPages);
        }
    }
}
