using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace ForegroundWindow
{
    internal class Program
    {
        [DllImport("user32.dll", EntryPoint = "SetForegroundWindow")]
        public static extern bool _Internal_SetForegroundWindow(IntPtr hWnd);

        [DllImport("user32.dll", EntryPoint = "GetForegroundWindow")]
        public static extern IntPtr _Internal_GetForegroundWindow();

        [DllImport("user32.dll", EntryPoint = "PostMessage")]
        public static extern int PostMessage(IntPtr hwnd, int wMsg, int wParam, int lParam);

        [DllImport("user32.dll", SetLastError = true)]
        public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

        // When you don't want the ProcessId, use this overload and pass 
        // IntPtr.Zero for the second parameter
        [DllImport("user32.dll")]
        public static extern uint GetWindowThreadProcessId(IntPtr hWnd, IntPtr ProcessId);

        [DllImport("kernel32.dll")]
        public static extern uint GetCurrentThreadId();

        [DllImport("user32.dll")]
        public static extern bool AttachThreadInput(uint idAttach, uint idAttachTo, bool fAttach);

        [DllImport("user32.dll", SetLastError = true)]
        public static extern bool BringWindowToTop(IntPtr hWnd);

        [DllImport("user32.dll", SetLastError = true)]
        public static extern bool BringWindowToTop(HandleRef hWnd);

        [DllImport("user32.dll")]
        public static extern bool ShowWindow(IntPtr hWnd, uint nCmdShow);

        public static bool SetForegroundWindow(IntPtr hWnd)
        {
            if (_Internal_SetForegroundWindow(hWnd)) return true;
            uint foreThread = GetWindowThreadProcessId(_Internal_GetForegroundWindow(), IntPtr.Zero);
            uint appThread = GetCurrentThreadId();
            const uint SW_SHOW = 5;
            if (foreThread != appThread)
            {
                AttachThreadInput(foreThread, appThread, true);
                BringWindowToTop(hWnd);
                ShowWindow(hWnd, SW_SHOW);
                AttachThreadInput(foreThread, appThread, false);
            }
            else
            {
                BringWindowToTop(hWnd);
                ShowWindow(hWnd, SW_SHOW);
            }
            return true;
        }

        static void Main(string[] args)
        {
            if (args.Length > 0 && args[0] != null)
            {
                if (args[0] == "--get")
                {
                    Console.WriteLine(_Internal_GetForegroundWindow());
                }
                else if (args[0] == "--set")
                {
                    PostMessage((IntPtr)int.Parse(args[1]), 0x112, 0xF120, 0);
                    SetForegroundWindow((IntPtr)int.Parse(args[1]));
                    Console.WriteLine("done");
                }
                else
                {
                    Console.Error.WriteLine("Usage: foregroundWindow.exe --get|--set handle");
                }
            }
            else
            {
                Console.Error.WriteLine("Usage: foregroundWindow.exe --get|--set handle");
            }
        }
    }
}
