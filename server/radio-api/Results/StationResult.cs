namespace radio_api.Results
{
    public class StationResult
    {
        public Guid Id { get; init; }
        public string Name { get; set; }
        public string Changeuuid { get; set; }
        public string Serveruuid { get; set; }
        public string Stationuuid { get; set; }
        public string Url { get; set; }
        public string UrlResolved { get; set; }
        public string HomePage { get; set; }
        public string Favicon { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string CountryCode { get; set; }
        public string Language { get; set; }
        public string Codec { get; set; }
        public Guid UserId { get; set; }

    }
}
