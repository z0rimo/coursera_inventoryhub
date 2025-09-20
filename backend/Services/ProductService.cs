using backend.Models;

namespace backend.Services
{
    public class ProductService
    {
        private static readonly List<Product> _db = new()
        {
            new Product{ Id=1, Name="Laptop Pro", Category="Electronics", Price=1299, Stock=8 },
            new Product{ Id=2, Name="Wireless Mouse", Category="Electronics", Price=29.9m, Stock=44 },
            new Product{ Id=3, Name="Office Chair", Category="Furniture", Price=199, Stock=12 },
        };
        private static int _nextId = 4;

        public (IEnumerable<Product> items, int total) Query(string? search, int page, int pageSize)
        {
            var q = _db.AsQueryable();
            if (!string.IsNullOrWhiteSpace(search))
            {
                var s = search.Trim().ToLowerInvariant();
                q = q.Where(p => p.Name.ToLower().Contains(s) || p.Category.ToLower().Contains(s));
            }
            var total = q.Count();
            var items = q.OrderBy(p => p.Id)
                         .Skip((page - 1) * pageSize)
                         .Take(pageSize)
                         .ToList();
            return (items, total);
        }

        public Product? Get(int id) => _db.FirstOrDefault(p => p.Id == id);

        public Product Create(Product p)
        {
            p.Id = _nextId++;
            _db.Add(p);
            return p;
        }

        public bool Update(int id, Product updated)
        {
            var p = Get(id);
            if (p is null) return false;
            p.Name = updated.Name; p.Category = updated.Category;
            p.Price = updated.Price; p.Stock = updated.Stock;
            return true;
        }

        public bool Delete(int id)
        {
            var p = Get(id);
            return p is not null && _db.Remove(p);
        }
    }
}
