using System;
using System.Collections.Generic;
using System.Linq;

namespace EventMapr
{
    public static class Extensions
    {
        private static readonly Random _random = new Random(DateTime.Now.Millisecond);

        public static T GetRandom<T>(this IEnumerable<T> source) =>
            source.ElementAt(_random.Next(source.Count()));

        public static string ToLowerCamelCase(this string s) =>
            string.IsNullOrWhiteSpace(s) ? s : char.ToLowerInvariant(s[0]) + s.Substring(1);
    }
}
