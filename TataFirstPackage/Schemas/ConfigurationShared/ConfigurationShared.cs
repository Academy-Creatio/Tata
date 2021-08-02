using Common.Logging;
using Terrasoft.Core.Factories;

namespace TataShared
{

	[DefaultBinding(typeof(IConfigurationShared))]
	public class ConfigurationShared : IConfigurationShared
	{
		ILog _logger;
		public ConfigurationShared()
		{
			_logger = LogManager.GetLogger("TataLogger");
		}

		public void LogInfo(string message)
		{
			_logger.InfoFormat("{0}", message);
		}

		public void LogWarn(string message)
		{
			_logger.WarnFormat("{0}", message);
		}

		public void LogError(string message)
		{
			_logger.ErrorFormat("{0}", message);
		}
	}
}