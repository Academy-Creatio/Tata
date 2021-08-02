using TataShared;
using Terrasoft.Core.Factories;

namespace Tata.Files.cs
{


	[DefaultBinding(typeof(ICalculator), Name = "VersionOne")]
	public class Calculator : ICalculator
	{

		public int Add(int a, int b)
		{
			return a + b+10;
		}

		public int Sub(int a, int b)
		{
			return a - b;
		}
	} 
	
	[DefaultBinding(typeof(ICalculator), Name ="VersionTwo")]
	public class CalculatorTwo : ICalculator
	{
		public int Add(int a, int b)
		{
			var logger = ClassFactory.Get<IConfigurationShared>();
			logger.LogInfo($"Logging from assembly: {a+b}");

			return a + b;
		}

		public int Sub(int a, int b)
		{
			return a - b;
		}
	}
}
