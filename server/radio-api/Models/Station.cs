using System.ComponentModel.DataAnnotations.Schema;

namespace radio_api.Models
{
    [Table("stations")]
    public class Station
    {
        public Guid Id { get; init; }
        public string? Name { get; set; }
        public string? Changeuuid { get; set; }
        public string? Serveruuid { get; set; }
        public string? Stationuuid { get; set; }
        public string? Url { get; set; }
        public string? UrlResolved { get; set; }
        public string? HomePage { get; set; }
        public string? Favicon { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? CountryCode { get; set; }
        public string? Language { get; set; }
        public string? Codec { get; set; }
        public Guid? UserId { get; set; }
        public virtual User? User { get; set; }

        public Station(
            string name, 
            string changeuuid, 
            string serveruuid, 
            string stationuuid,
            string url,
            string urlResolved,
            string homePage,
            string favicon,
            string country,
            string state,
            string countryCode,
            string language,
            string codec
            ) { 
            Name = name;
            Changeuuid = changeuuid;
            Serveruuid = serveruuid;
            Stationuuid = stationuuid;
            Url = url;
            UrlResolved = urlResolved;
            HomePage = homePage;
            Favicon = favicon;
            Country = country;
            State = state;
            CountryCode = countryCode;
            Language = language;
            Codec = codec;
        }

    }
}
