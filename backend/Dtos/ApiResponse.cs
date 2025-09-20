namespace backend.Dtos
{
    public class ApiResponse<T>
    {
        public string Status { get; set; } = "success";
        public T? Data { get; set; }
        public string? Error { get; set; }

        public static ApiResponse<T> Ok(T data) => new() { Data = data };
        public static ApiResponse<T> Fail(string error) => new() { Status = "error", Error = error };
    }
}
