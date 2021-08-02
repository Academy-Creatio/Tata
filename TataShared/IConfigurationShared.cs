using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TataShared
{
	public interface IConfigurationShared
	{
		void LogError(string message);
		void LogInfo(string message);
		void LogWarn(string message);
	}
}
