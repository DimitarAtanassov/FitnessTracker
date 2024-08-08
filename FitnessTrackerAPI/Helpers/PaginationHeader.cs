namespace FitnessTrackerAPI.Helpers
{
    /*
        We want to be able to return the pagination results to our client, to do this we will use our header, so the pagination details will be in the response header
    */
    public class PaginationHeader(int PageIndex, int itemsPerPage, int totalItems, int totalPages)
    {
        public int PageIndex { get; set; } = PageIndex;

        public int ItemsPerPage { get; set; } = itemsPerPage;

        public int TotalItems { get; set; } = totalItems;

        public int TotalPages { get; set; } = totalPages;
    }
}
