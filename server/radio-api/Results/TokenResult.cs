﻿namespace radio_api.Results
{
    public class TokenResult
    {
        public string Token { get; set; }
        public TokenResult(string token) { Token = token; }
    }
}
