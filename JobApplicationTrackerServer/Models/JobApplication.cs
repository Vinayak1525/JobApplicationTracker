namespace JobApplicationTrackerServer.Models
{
    public class JobApplication
    {
        /// <summary>
        /// The id of the application.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The company name associated with the application.
        /// </summary>
        public string CompanyName { get; set; } = string.Empty;

        /// <summary>
        /// The position associated with the application.
        /// </summary>
        public string Position { get; set; } = string.Empty;

        /// <summary>
        /// The status associated with the application.
        /// </summary>
        public string Status { get; set; } = "Applied"; // Default status

        /// <summary>
        /// The applied data of this application.
        /// </summary>
        public DateTime DateApplied { get; set; } = DateTime.UtcNow;
    }
}
