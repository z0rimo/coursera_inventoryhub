using backend.Dtos;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController(ProductService svc) : ControllerBase
    {
        private readonly ProductService _svc = svc;

        // GET /api/products?search=&page=1&pageSize=10
        [HttpGet]
        public ActionResult<ApiResponse<PagedResult<Product>>> GetAll([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var (items, total) = _svc.Query(search, Math.Max(page, 1), Math.Clamp(pageSize, 1, 100));
            var payload = new PagedResult<Product> { Items = items, Total = total, Page = page, PageSize = pageSize };
            return Ok(ApiResponse<PagedResult<Product>>.Ok(payload));
        }

        // GET /api/products/1
        [HttpGet("{id:int}")]
        public ActionResult<ApiResponse<Product>> GetById(int id)
        {
            var p = _svc.Get(id);
            if (p is null) return NotFound(ApiResponse<Product>.Fail("Not found"));
            return Ok(ApiResponse<Product>.Ok(p));
        }

        // POST /api/products
        [HttpPost]
        public ActionResult<ApiResponse<Product>> Create([FromBody] ProductCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ApiResponse<Product>.Fail("Invalid data"));
            var p = new Product { Name = dto.Name, Category = dto.Category, Price = dto.Price, Stock = dto.Stock };
            var created = _svc.Create(p);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, ApiResponse<Product>.Ok(created));
        }

        // PUT /api/products/1
        [HttpPut("{id:int}")]
        public ActionResult<ApiResponse<object>> Update(int id, [FromBody] ProductUpdateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ApiResponse<object>.Fail("Invalid data"));
            var ok = _svc.Update(id, new Product { Name = dto.Name, Category = dto.Category, Price = dto.Price, Stock = dto.Stock });
            if (!ok) return NotFound(ApiResponse<object>.Fail("Not found"));
            return Ok(ApiResponse<object>.Ok(new { updated = true }));
        }

        // DELETE /api/products/1
        [HttpDelete("{id:int}")]
        public ActionResult<ApiResponse<object>> Delete(int id)
        {
            var ok = _svc.Delete(id);
            if (!ok) return NotFound(ApiResponse<object>.Fail("Not found"));
            return Ok(ApiResponse<object>.Ok(new { deleted = true }));
        }
    }
}
