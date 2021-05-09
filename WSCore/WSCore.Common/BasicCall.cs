using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace WSCore.Common
{
    public class BasicCall
    {
        #region Test
        // [HttpGet("SendGetAsync", Name = "SendGetAsync")]
        public static async Task<string> SendGetAsync(string url)
        {
            try
            {
                HttpClient client = new HttpClient();
                //client.BaseAddress = new Uri(url);
                // Add an Accept header for JSON format.  
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                // List all Names.  
                HttpResponseMessage response = client.GetAsync(url).Result;  // Blocking call!
                if (response.IsSuccessStatusCode)
                {
                    return response.Content.ReadAsStringAsync().Result;
                }
                else
                {
                    return "";
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }            
        }
        #endregion Test
    }
}
