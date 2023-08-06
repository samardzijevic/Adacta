namespace MVCWebApp.Models
{
    public class Task
    {
        public int TaskID { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool Status { get; set; }
    }
}
