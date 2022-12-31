# YOLOv5 Deepsort Detector
## Deployment
### Environment

- Python 3.6+，pip 20+
- Pytorch
- pip install -r requirements.txt


### Deploy the app

1. Clone the repository
    ```
    $ git clone https://github.com/kevinren1108/Apollo-Capstone-Project.git
    ```
2. Redirect to the repository
    ```
    $ cd ezparking_ai_detector
    ```
3. Create python virtual environment
    ```
    $ python -m venv venv
    ```
4. Activate the virtual environment
    ```
    $ venv/Scripts/activate
    ```
6. Install pytorch

    > Based on a particular OS, CUDA, and package tool, use https://pytorch.org/get-started/locally/ to find the appropriate command line. For example: Windows 10、pip、CUDA 16.
    ```
    $ pip3 install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu116
    ```
7. Install packages
    ```
    $ pip install -r requirements.txt
    ```
8. Execute the program
    ```
    python main.py
    ```
