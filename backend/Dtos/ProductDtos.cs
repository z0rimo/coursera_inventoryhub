using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class ProductCreateDto
    {
        [Required, MinLength(2)] public string Name { get; set; } = string.Empty;
        [Required, MinLength(2)] public string Category { get; set; } = string.Empty;
        [Range(0, double.MaxValue)] public decimal Price { get; set; }
        [Range(0, int.MaxValue)] public int Stock { get; set; }
    }

    public class ProductUpdateDto : ProductCreateDto { }

    public class PagedResult<T>
    {
        public IEnumerable<T> Items { get; set; } = Enumerable.Empty<T>();
        public int Total { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
