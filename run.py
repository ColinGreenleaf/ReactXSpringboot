import subprocess
import signal

# start the first process (mvnw spring-boot:run)
mvnw_process = subprocess.Popen(['./mvnw', 'spring-boot:run'], cwd='proj')

# start the second process (npm start)
npm_process = subprocess.Popen(['npm', 'start'], cwd='proj-react')

# processes will run until the user interrupts the program
try:
    mvnw_process.wait()
    npm_process.wait()
# Handle the keyboard interrupt
except KeyboardInterrupt:
    # Handle the keyboard interrupt to terminate both processes
    print("Terminating both processes...")

    # send SIGINT to the processes
    mvnw_process.send_signal(signal.SIGINT)
    npm_process.send_signal(signal.SIGINT)

    # if they haven't terminated yet, kill them
    mvnw_process.terminate()
    npm_process.terminate()

    # Ensure they are terminated
    mvnw_process.wait()
    npm_process.wait()

    print("Both processes have been terminated.")
