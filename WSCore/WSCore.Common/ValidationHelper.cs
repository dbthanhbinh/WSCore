using System.Text.RegularExpressions;

namespace WSCore.Common
{
    public class ValidationHelper
    {
        public bool CheckNullOrEmpty(string str)
        {
            return (string.IsNullOrEmpty(str) || string.IsNullOrWhiteSpace(str));
        }

        public bool CheckMinLength(string str, int minLength)
        {
            return str.Length < minLength;
        }

        public bool CheckMaxLength(string str, int maxLength)
        {
            return str.Length > maxLength;


            //// Check validation Dto

            //Type type = typeof(ArticleDto);
            //PropertyInfo[] properties = type.GetProperties();
            //foreach (PropertyInfo property in properties)
            //{
            //    Console.WriteLine("{0} = {1}", property.Name, property.GetValue(articleDto, null));

            //    var customAttributes = property.GetCustomAttributesData();
            //    foreach (var data in customAttributes)
            //    {
            //        // The type of the attribute,
            //        // e.g. "SomeCustomAttribute"
            //        Console.WriteLine(data.AttributeType);

            //        foreach (var arg in data.ConstructorArguments)
            //        {
            //            // The type and value of the constructor arguments,
            //            // e.g. "System.String a supplied value"
            //            Console.WriteLine(arg.ArgumentType + " " + arg.Value);
            //        }
            //    }




            //    //object[] attrs = property.GetCustomAttributes(true);
            //    //foreach (object attr in attrs)
            //    //{   
            //    //    Console.WriteLine("{0} = {1}", attr, attr);


            //    //}
            //}

            //Console.Read();
        }
    }
}
